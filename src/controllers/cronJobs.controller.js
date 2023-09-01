import { connection } from "../database/conexion.js";

const comprobarAlerta = async () => {

    try {
        let quer = "SELECT count(*) AS 'NoAlertas' FROM alertas";

        const [rows] = await connection.query(quer);
        if (rows.length > 0) {
            return rows[0];
        } else
            return "no hay datos";

    } catch (error) {
        return (error.message);
    }
};

const obtenerAlerta = async () => {

    try {
        let quer = "SELECT IdAlerta, IdDistribuidor, NivelFecha, TIMESTAMPDIFF(WEEK, Fecha, NOW()) as Semanas FROM alertas where Estado='A';";

        const [rows] = await connection.query(quer);
        if (rows.length > 0) {
            return rows;
        } else
            return "no hay datos";

    } catch (error) {
        return (error.message);
    }
};

const actualizarNivel = async (idAlerta, nuevoNivel) => {
    try {

        const quer = `UPDATE alertas SET NivelFecha = '${nuevoNivel}' WHERE IdAlerta = ${idAlerta};`;

        const [result] = await connection.query(quer);

        if (result.affectedRows > 0) return "todoCorrecto";
        else return "noSePudo";

    } catch (error) {
        return (error.message);
    }
};

export const methods = {
    comprobarAlerta,
    obtenerAlerta,
    actualizarNivel,
}