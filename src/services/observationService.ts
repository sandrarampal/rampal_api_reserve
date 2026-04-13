import prisma from "../config/database";

const createObservation = async (data: {
  quantity: number;
  notes?: string;
  speciesId: number;
  zoneId: number;
}) => {
  return prisma.observation.create({ data });
};

const getAllObservations = async (params: {
  zoneId?: number;
  speciesId?: number;
  page: number | 1;
  perPage: number | 20;
}) => {
  const { zoneId, speciesId, page, perPage } = params;
  const where: any = {};

  if (zoneId) {
    where.zoneId = zoneId;
  }

  if (speciesId) {
    where.speciesId = speciesId;
  }

  const [observations, total] = await Promise.all([
    prisma.observation.findMany({
      where,
      orderBy: { observedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        quantity: true,
        notes: true,
        species: {
          select: {
            commonName: true,
          },
        },
        zone: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.observation.count({ where }),
  ]);

  return {
    data: observations,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

const getObservationById = async (id: number) => {
  return prisma.observation.findUniqueOrThrow({
    where: { id },
    include: { species: true, zone: true },
  });
};

const deleteObservation = async (id: number) => {
  return prisma.observation.delete({ where: { id } });
};

export default {
  createObservation,
  getAllObservations,
  getObservationById,
  deleteObservation,
};
