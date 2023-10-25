import { Router } from "express";
import { methods as usuariosController } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", usuariosController.getUsuarios);
router.post("/", usuariosController.agregarUsuario);
router.post("/validar", usuariosController.validarUsuario);
router.post("/consultaId", usuariosController.getUsuarioXId);
export default router;