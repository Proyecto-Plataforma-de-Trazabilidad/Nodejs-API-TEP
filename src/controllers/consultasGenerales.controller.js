import { connection } from "../database/conexion.js";

//Consulta de distribuidores 
const getDistribuidores = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM distribuidores");
        res.json(result[0]);
    } catch (error) {
        res.json({ error: true, mensaje: "Error al traer los datos" });
        // res.status(500);
        // res.send(error.message);
    }
};

//Consulta de EmpresaDestino 
const getEmpresaDestino = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM empresadestino");
        res.json(result[0]);
    } catch (error) {
        res.json({ error: true, mensaje: "Error al traer los datos" });
        // res.status(500);
        // res.send(error.message);
    }
};

//Consulta de Contenedores 
const getContenedores = async (req, res) => {
    try {
        const result = await connection.query("SELECT C.Latitud,C.Longitud,C.Origen,TC.Concepto FROM contenedores as C inner join tipocontenedor as TC on C.idTipoCont = TC.idTipoCont");
        res.json(result[0]);
    } catch (error) {
        res.json({ error: true, mensaje: "Error al traer los datos" });
        // res.status(500);
        // res.send(error.message);
    }
};

//Consulta de CAT 
const getCAT = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM centroacopiotemporal");
        res.json(result[0]);
    } catch (error) {
        res.json({ error: true, mensaje: "Error al traer los datos" });
        // res.status(500);
        // res.send(error.message);
    }
};

//Consulta de CAT 
const getERP = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM empresarecolectoraprivada");
        res.json(result[0]);
    } catch (error) {
        res.json({ error: true, mensaje: "Error al traer los datos" });
        // res.status(500);
        // res.send(error.message);
    }
};

export const methods = {
    getDistribuidores,
    getEmpresaDestino,
    getContenedores,
    getCAT,
    getERP
}