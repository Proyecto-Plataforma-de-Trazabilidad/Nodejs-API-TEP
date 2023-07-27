import { Router } from "express";
import { methods as NotificacionesPush } from "../controllers/pushNotification.controller.js";

const router = Router();

router.get("/serviciopush/subscribe", NotificacionesPush.getSubscription);
router.get("/serviciopush/key", NotificacionesPush.getKey);


export default router;