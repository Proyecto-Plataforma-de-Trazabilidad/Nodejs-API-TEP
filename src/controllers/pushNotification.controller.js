import { connection } from "../database/conexion.js";
import vapid from '../vapid-kes/vapid.json' assert {type: 'json'};
import base64url from "base64url";
import webpush from "web-push";

//Web-push configuration
webpush.setVapidDetails(
    'mailto:usersergiojos3@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

//Insertar
const agregarSuscripDB = async (datos) => {
    try {
        //*Falta hacer validacio 
        const quer = `INSERT INTO servicionotificaciones (IdUsuario, Endpoint, ExpirationTime, Keys_p256dh, Keys_auth) VALUES(${datos.idusuario}, '${datos.endpoint}', '${datos.expirationTime}', '${datos.keys.p256dh}','${datos.keys.auth}');`;
        const [result] = await connection.query(quer);

        if (result.affectedRows > 0) {
            return "todoCorrecto";
        } else {
            return "noSePudo";
        }

    } catch (error) {
        return (error.message);
    }
};

//consultar suscripcion 
const consultarSuscripDB = async (opc, param) => {

    try {
        let quer;
        switch (opc) {
            case 'ConsultaGeneral':
                quer = `SELECT * FROM servicionotificaciones`;
                break;
            case 'TodosLosUsuarios':
                quer = `SELECT IdSuscripcion, endpoint, expirationTime, Keys_p256dh, Keys_auth FROM servicionotificaciones`;
                break;
            case 'PorTipoUsuario':
                quer = `SELECT S.IdSuscripcion, S.endpoint, S.expirationTime, S.Keys_p256dh, S.Keys_auth FROM servicionotificaciones AS S INNER JOIN usuarios AS U ON S.IdUsuario = U.IdUsuario INNER JOIN tipousuario AS T ON U.IdTipoUsuario  = T.IdTipoUsuario  WHERE T.Concepto = '${param}'`;
                break;
            case 'UnSoloUsuario':
                quer = `SELECT S.IdSuscripcion, S.endpoint, S.expirationTime, S.Keys_p256dh, S.Keys_auth FROM servicionotificaciones AS S INNER JOIN usuarios AS U ON S.IdUsuario = U.IdUsuario INNER JOIN tipousuario AS T ON U.IdTipoUsuario  = T.IdTipoUsuario  WHERE S.IdUsuario = '${param}'`;
                break;

            default:
                break;
        }

        if (quer) {
            const [rows] = await connection.query(quer);
            if (rows.length > 0) {

                let respuesta = rows.map(row => {

                    let suscripcion = {};
                    let llaves = {};

                    Object.entries(row).forEach(([key, value]) => {

                        if (key.includes('p256dh')) {
                            llaves['p256dh'] = value;
                        } else if (key.includes('auth')) {
                            llaves['auth'] = value;
                        } else {
                            suscripcion[key] = value;
                        }

                    });

                    suscripcion['keys'] = llaves;

                    //console.log(suscripcion);

                    return suscripcion; //Cuando termina el map 
                })//Fin del map 

                return respuesta;
            } else
                return "no hay datos";
        }


    } catch (error) {
        return (error.message);
    }
};

const borrarSuscripDB = (IdsSuscripciones) => {
    try {
        let queryPromises = [];

        IdsSuscripciones.forEach(idSuscripcion => {

            let quer = `DELETE FROM servicionotificaciones WHERE IdSuscripcion = ${idSuscripcion}`;
            const result = connection.query(quer);
            queryPromises.push(result);

        });

        Promise.all(queryPromises).then(() => {   //Se espera a que todas las promesas se resuelvan 
            return "Se borraron los registros"
        });

    } catch (error) {
        return (error.message);
    }
}

const postSubscription = (req, res) => {
    const datos = req.body;
    console.log(datos);
    agregarSuscripDB(datos).then(result => {
        //console.log(result); 
        res.send(result);
    });
}

const getKey = (req, res) => {

    let llaves = base64url.toBuffer(vapid.publicKey);
    res.send(llaves);
}

const sendPush = (req, res) => {
    console.log(req);
    const datos = req.body;

    const posteo = {
        titulo: datos.titulo,
        cuerpo: datos.cuerpo,
        url: datos.url,
        imagen: datos.imagen,
    }

    consultarSuscripDB(datos.opcion, datos.parametros).then(suscripciones => {

        let IdSuscripFallo = [];
        let notifiacionesEnviadas = [];

        if (suscripciones == "no hay datos") {
            res.send("No hay usuarios suscritos");
        } else {

            suscripciones.forEach((suscripcion, i) => {

                let idSuscripcion = suscripcion.IdSuscripcion;
                delete suscripcion.IdSuscripcion;

                const pushProm = webpush.sendNotification(suscripcion, JSON.stringify(posteo)) //Se guardan todas las promesas en una variable
                    .catch(err => {
                        if (err.statusCode == '410' || err.statusCode == '401') { //Si ya no existe esa suscripcion 
                            // console.log("Fallo enviada");
                            //console.log(err);
                            IdSuscripFallo.push(idSuscripcion); //Se agrega al arreglo de las que fallaron 
                        }

                    }); //Fin catch

                notifiacionesEnviadas.push(pushProm);

            }); //Fin for each


            Promise.all(notifiacionesEnviadas).then(() => {   //Se espera a que todas las promesas de las notificaciones se resuelvan 
                //Borrar en la base de datos todas la suscripciones que ya no existen por si id
                if (IdSuscripFallo.length > 0) {
                    const resultado = borrarSuscripDB(IdSuscripFallo);
                    //console.log(resultado);
                }

            });

            res.send("Se enviaron todas");
        }

    });

}



export const methods = {
    postSubscription,
    getKey,
    sendPush,
}