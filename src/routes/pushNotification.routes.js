import { Router } from "express";
import { methods as NotificacionesPush } from "../controllers/pushNotification.controller.js";

const router = Router();

router.post("/serviciopush/subscribe", NotificacionesPush.postSubscription);
router.get("/serviciopush/key", NotificacionesPush.getKey);
router.post("/serviciopush/enviar", NotificacionesPush.sendPush);


export default router;