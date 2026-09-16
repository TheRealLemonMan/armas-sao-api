import { Router } from "express";
import * as controller from "../controllers/armas.controller";
import { validarArma } from "../middlewares/validarArma.middleware";

const router = Router();

router.get("/", controller.getArmas);
router.get("/:id", controller.getArmaPorId);
router.post("/", validarArma, controller.postArma);
router.put("/:id", validarArma, controller.putArma);
router.delete("/:id", controller.deleteArma);

export default router;