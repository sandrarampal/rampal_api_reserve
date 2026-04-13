import { Request, Response, NextFunction } from "express";
import zoneService from "../services/zoneService";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zone = await zoneService.createZone(req.body);
    res.status(201).json(zone);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zones = await zoneService.getAllZones();
    res.json(zones);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zone = await zoneService.getZoneById(Number(req.params.id));
    res.json(zone);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zone = await zoneService.updateZone(Number(req.params.id), req.body);
    res.json(zone);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await zoneService.deleteZone(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { getOne, create, remove, getAll, update };
