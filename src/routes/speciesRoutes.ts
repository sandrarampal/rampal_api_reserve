import { Router } from "express";
import speciesController from "../controllers/speciesController";
import validate from "../middlewares/validate";
import {
  createSpeciesSchema,
  updateSpeciesSchema,
  getSpeciesSchema,
  getSpeciesQuerySchema,
} from "../schemas/speciesSchema";

const router = Router();

router.get("/", validate(getSpeciesQuerySchema), speciesController.getAll);
router.get("/:id", validate(getSpeciesSchema), speciesController.getOne);
router.post("/", validate(createSpeciesSchema), speciesController.create);
router.put("/:id", validate(updateSpeciesSchema), speciesController.update);
router.delete("/:id", validate(getSpeciesSchema), speciesController.remove);
router.post("/:id/zones", speciesController.associateSpecies);
router.delete("/:speciesId/zones/:zoneId", speciesController.disconnectSpecies);

export default router;
