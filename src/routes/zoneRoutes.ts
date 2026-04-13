import { Router } from "express";
import zoneController from "../controllers/zoneController";
import validate from "../middlewares/validate";
import {
  createZoneSchema,
  updateZoneSchema,
  getZoneSchema,
} from "../schemas/zoneSchema";

const router = Router();

router.get("/", zoneController.getAll);
router.get("/:id", validate(getZoneSchema), zoneController.getOne);
router.post("/", validate(createZoneSchema), zoneController.create);
router.put("/:id", validate(updateZoneSchema), zoneController.update);
router.delete("/:id", validate(getZoneSchema), zoneController.remove);

export default router;
