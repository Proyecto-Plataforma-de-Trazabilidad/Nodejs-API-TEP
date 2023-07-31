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
            return "todoCorrecto";
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
            case 'SoloSuscripcion':
                quer = `SELECT endpoint, expirationTime, Keys_p256dh, Keys_auth FROM servicionotificaciones`;
                break;
            case 'PorTipoUsuario':
                quer = `SELECT S.endpoint, S.expirationTime, S.Keys_p256dh, S.Keys_auth FROM servicionotificaciones AS S INNER JOIN usuarios AS U ON S.IdUsuario = U.IdUsuario INNER JOIN tipousuario AS T ON U.Idtipousuario = T.Idtipousuario WHERE T.Descripcion = '${param}'`;
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
                    return suscripcion;
                })

                return respuesta;
            } else
                return "no hay datos";
        }


    } catch (error) {
        return (error.message);
    }
};

const postSubscription = (req, res) => {
    const datos = req.body;
    console.log(datos);
    agregarSuscripDB(datos).then(result => {
        console.log(result); res.send(result);
    });
}

const getKey = (req, res) => {

    let llaves = base64url.toBuffer(vapid.publicKey);
    res.send(llaves);
}

const sendPush = (req, res) => {
    const datos = req.body;
    const posteo = {
        titulo: datos.titulo,
        cuerpo: datos.cuerpo,
        url: datos.url,
    }

    consultarSuscripDB(datos.opcion, datos.parametros).then(suscripciones => {

        suscripciones.forEach((suscripcion, i) => {
            console.log(suscripcion);
            webpush.sendNotification(suscripcion, JSON.stringify(posteo));

        });
        res.send("enviado");

    });

}



export const methods = {
    postSubscription,
    getKey,
    sendPush,
}