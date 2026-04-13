import { Router } from "express";
import ObservationController from "../controllers/observationController";
import validate from "../middlewares/validate";
import {
  createObservationSchema,
  getObservationSchema,
  getObservationsQuerySchema,
} from "../schemas/observationSchema";

const router = Router();

router.get(
  "/",
  validate(getObservationsQuerySchema),
  ObservationController.getAll,
);
router.get(
  "/:id",
  validate(getObservationSchema),
  ObservationController.getOne,
);
router.post(
  "/",
  validate(createObservationSchema),
  ObservationController.create,
);
router.delete(
  "/:id",
  validate(getObservationSchema),
  ObservationController.remove,
);

export default router;
