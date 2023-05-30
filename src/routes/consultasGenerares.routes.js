import { Router } from "express";
import { methods as ConsultasGenerales } from "../controllers/consultasGenerales.controller.js";

const router = Router();

router.get("/consultasGenerales/distribuidores", ConsultasGenerales.getDistribuidores);
router.get("/consultasGenerales/empresas-destino", ConsultasGenerales.getEmpresaDestino);
router.get("/consultasGenerales/contenedores", ConsultasGenerales.getContenedores);
router.get("/consultasGenerales/cat", ConsultasGenerales.getCAT);
router.get("/consultasGenerales/erp", ConsultasGenerales.getERP);

export default router;