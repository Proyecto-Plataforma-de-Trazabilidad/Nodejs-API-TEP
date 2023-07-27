import { connection } from "../database/conexion.js";
import vapid from '../vapid-kes/vapid.json' assert {type: 'json'};
import base64url from "base64url";

const getSubscription = (req, res) => {

    res.json("Jjajaja");
}

const getKey = (req, res) => {

    let llaves = base64url.toBuffer(vapid.publicKey);
    res.json(llaves);
}

export const methods = {
    getSubscription,
    getKey,
}