import prisma from "../config/database";

const createSpecies = async (data: {
  commonName: string;
  scientificName: string;
  type: string;
  protectionStatus: string;
}) => {
  return prisma.species.create({ data });
};

const getAllSpecies = async (params: {
  type?: string;
  status?: string;
  search?: string;
}) => {
  const { type, status, search } = params;
  const where: any = {};

  if (type) {
    where.type = type;
  }

  if (status) {
    where.protectionStatus = status;
  }

  if (search) {
    where.commonName = { contains: search, mode: "insensitive" };
  }

  return prisma.species.findMany(where);
};

const getSpeciesById = async (id: number) => {
  return prisma.species.findUnique({
    where: { id },
    select: {
      id: true,
      commonName: true,
      scientificName: true,
      type: true,
      protectionStatus: true,
      zones: {
        select: {
          name: true,
          type: true,
          description: true,
          altitude: true,
        },
      },
      observations: {
        select: {
          notes: true,
          observedAt: true,
        },
        orderBy: { observedAt: "desc" },
        take: 10,
      },
    },
  });
};

const updateSpecies = async (
  id: number,
  data: {
    commonName?: string;
    scientificName?: string;
    type?: string;
    protectionStatus?: string;
  },
) => {
  return prisma.species.update({
    where: { id },
    data,
  });
};

const deleteSpecies = async (id: number) => {
  return prisma.species.delete({ where: { id } });
};

// Association zone-espèces:
const associateZoneToSpecies = async (id: number, data: { zoneId: number }) => {
  return prisma.zone.update({
    where: { id: data.zoneId },
    data: {
      species: {
        connect: { id: id },
      },
    },
  });
};

const removeSpeciesFromZone = async (speciesId: number, zoneId: number) => {
  return prisma.zone.update({
    where: { id: zoneId },
    data: {
      species: {
        disconnect: { id: speciesId },
      },
    },
  });
};

export default {
  createSpecies,
  getAllSpecies,
  getSpeciesById,
  updateSpecies,
  deleteSpecies,
  associateZoneToSpecies,
  removeSpeciesFromZone,
};
