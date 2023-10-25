//import { query } from "express";
import { connection } from "../database/conexion.js";

//ConsultaSimple 
const getUsuarios = async (req, res) => {
    try {
        const result = await connection.query("select * from usuarios");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//Insertar
const agregarUsuario = async (req, res) => {
    try {

        if (req.body.RolUsuario === undefined || req.body.Nombre === undefined || req.body.Contrasena === undefined || req.body.Correo === undefined) {
            res.status(400).json({ message: "No mando los datos completos" });
        } else {

            const result = await connection.query(`INSERT INTO usuarios (RolUsario, Nombre, Contrasena, Correo) VALUES('${req.body.RolUsuario}','${req.body.Nombre}', md5('${req.body.Contrasena}'),'${req.body.Correo}');`);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//Consulta un usuario
const validarUsuario = async (req, res) => {
    try {
        if (req.body.correo === undefined || req.body.contrasena === undefined) {
            res.status(400).json({ message: "No mando los datos completos" });
        }

        //const queer = `Select * from usuarios where Correo='${req.body.correo}' and Contrasena=MD5('${req.body.contrasena}')`;
        //console.log(queer);
        const result = await connection.query(`SELECT IdUsuario, Idtipousuario, Nombre FROM usuarios WHERE Correo='${req.body.correo}' and Contrasena=MD5('${req.body.contrasena}')`);
        //res.json(result[0]);
        if (result[0].length === 0) {
            res.json({ error: true, mensaje: "Datos incorrectos" });
        } else {
            res.json({ error: false, mensaje: "Datos correctos", datos: result[0] });
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



//Consulta por usuario 
const getUsuarioPXId = async (req, res) => {
    try {
        if (req.body.correo === undefined) {
            res.status(400).json({ message: "No mando los datos completos" });
        }

        //const queer = `Select * from usuarios where Correo='${req.body.correo}' and Contrasena=MD5('${req.body.contrasena}')`;
        //console.log(queer);
        const result = await connection.query(`SELECT IdUsuarioPrimario, Nombre_RazonSocial FROM usuarioprimario WHERE Correo='${req.body.correo}' `);
        //res.json(result[0]);
        if (result[0].length === 0) {
            res.json({ error: true, mensaje: "No se encontraron datos" });
        } else {
            res.json({ error: false, mensaje: "Datos encontrados", datos: result[0] });
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsuarios,
    getUsuarioPXId,
    agregarUsuario,
    validarUsuario
}