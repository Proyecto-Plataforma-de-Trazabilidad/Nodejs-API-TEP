import { Router } from "express";
import { methods as usuariosController } from "../controllers/usuarios.controller.js";
import cors from "cors";

const router = Router();

var corsOptions = {
    origin: 'https://sacnej.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/", cors(corsOptions), usuariosController.getUsuarios);
router.post("/", cors(corsOptions), usuariosController.agregarUsuario);
router.post("/validar", cors(corsOptions), usuariosController.validarUsuario);
router.post("/primarioId", cors(corsOptions), usuariosController.getUsuarioPXId);
export default router;