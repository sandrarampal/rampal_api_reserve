import { Request, Response, NextFunction } from "express";
import observationService from "../services/observationService";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const observation = await observationService.createObservation(req.body);
    res.status(201).json(observation);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { zoneId, speciesId, page, perPage } = req.query;

    const params = {
      zoneId: zoneId ? Number(zoneId) : undefined,
      speciesId: speciesId ? Number(speciesId) : undefined,
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 20,
    };

    const observations = await observationService.getAllObservations(params);
    res.json(observations);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const observation = await observationService.getObservationById(
      Number(req.params.id),
    );
    res.json(observation);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await observationService.deleteObservation(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { create, getAll, getOne, remove };
