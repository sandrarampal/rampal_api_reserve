import { Request, Response, NextFunction } from "express";
import speciesService from "../services/speciesService";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const species = await speciesService.createSpecies(req.body);
    res.status(201).json(species);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const species = await speciesService.getAllSpecies(req.query);
    res.json(species);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const species = await speciesService.getSpeciesById(Number(req.params.id));
    res.json(species);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const species = await speciesService.updateSpecies(
      Number(req.params.id),
      req.body,
    );
    res.json(species);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await speciesService.deleteSpecies(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const associateSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await speciesService.associateZoneToSpecies(
      Number(req.params.id),
      req.body,
    );
    res.json(species);
  } catch (err) {
    next(err);
  }
};
const disconnectSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await speciesService.removeSpeciesFromZone(
      Number(req.params.speciesId),
      Number(req.params.zoneId),
    );
    res.json(species);
  } catch (err) {
    next(err);
  }
};

export default {
  getOne,
  create,
  remove,
  getAll,
  update,
  disconnectSpecies,
  associateSpecies,
};
