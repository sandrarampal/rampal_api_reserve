import prisma from "../config/database";

const createZone = async (data: {
  name: string;
  type: string;
  altitude?: number;
  description?: string;
}) => {
  return prisma.zone.create({ data });
};

const getAllZones = async () => {
  return prisma.zone.findMany();
};

const getZoneById = async (id: number) => {
  return prisma.zone.findUnique({ where: { id }, include: { species: true } });
};

const updateZone = async (
  id: number,
  data: {
    name?: string;
    type?: string;
    altitude?: number;
    description?: string;
  },
) => {
  return prisma.zone.update({
    where: { id },
    data,
  });
};

const deleteZone = async (id: number) => {
  return prisma.zone.delete({ where: { id } });
};

export default { createZone, getAllZones, getZoneById, updateZone, deleteZone };
