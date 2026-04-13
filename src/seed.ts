import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.observation.deleteMany();
  await prisma.species.deleteMany();
  await prisma.zone.deleteMany();

  //   ZONES

  const valley = await prisma.zone.create({
    data: { name: "Vallée du Vénéon", type: "vallée", altitude: 1200 },
  });
  const plateau = await prisma.zone.create({
    data: { name: "Plateau d'Emparis", type: "prairie", altitude: 2400 },
  });
  const lake = await prisma.zone.create({
    data: { name: "Lac du Lauvitel", type: "lac", altitude: 1530 },
  });
  const forest = await prisma.zone.create({
    data: { name: "Forêt de la Bérarde", type: "forêt", altitude: 1700 },
  });

  //   SPECIES

  const bouquetin = await prisma.species.create({
    data: {
      commonName: "Bouquetin des Alpes",
      scientificName: "Capra ibex",
      type: "mammifère",
      protectionStatus: "LC",
      zones: {
        connect: [{ id: valley.id }, { id: plateau.id }],
      },
    },
  });
  const aigle = await prisma.species.create({
    data: {
      commonName: "Aigle royal",
      scientificName: "Aquila chrysaetos",
      type: "oiseau",
      protectionStatus: "LC",
      zones: {
        connect: [{ id: lake.id }, { id: forest.id }],
      },
    },
  });
  const lagopede = await prisma.species.create({
    data: {
      commonName: "Lagopède alpin",
      scientificName: "Lagopus muta",
      type: "oiseau",
      protectionStatus: "VU",
      zones: {
        connect: [{ id: plateau.id }, { id: forest.id }],
      },
    },
  });
  const vipere = await prisma.species.create({
    data: {
      commonName: "Vipère aspic",
      scientificName: "Vipera aspis",
      type: "reptile",
      protectionStatus: "NT",
      zones: {
        connect: [{ id: lake.id }, { id: valley.id }],
      },
    },
  });
  const apollon = await prisma.species.create({
    data: {
      commonName: "Apollon",
      scientificName: "Parnassius apollo",
      type: "insecte",
      protectionStatus: "VU",
      zones: {
        connect: [{ id: forest.id }, { id: valley.id }],
      },
    },
  });
  const genepi = await prisma.species.create({
    data: {
      commonName: "Génépi",
      scientificName: "Artemisia genipi",
      type: "plante",
      protectionStatus: "NT",
      zones: {
        connect: [{ id: forest.id }, { id: plateau.id }],
      },
    },
  });

  //   Observations

  await prisma.observation.createMany({
    data: [
      {
        quantity: 5,
        notes: "Trois adultes et 2 petits",
        speciesId: bouquetin.id,
        zoneId: valley.id,
      },
      {
        quantity: 2,
        notes: "Envol observé au-dessus du lac",
        speciesId: aigle.id,
        zoneId: lake.id,
      },
      {
        quantity: 8,
        notes: "Groupe en plumage hivernal",
        speciesId: lagopede.id,
        zoneId: plateau.id,
      },
      {
        quantity: 1,
        notes: "Individu immobile sur rocher ensoleillé",
        speciesId: vipere.id,
        zoneId: lake.id,
      },
      {
        quantity: 14,
        notes: "Nombreux individus sur les chardons",
        speciesId: apollon.id,
        zoneId: forest.id,
      },
      {
        quantity: 3,
        notes: "Touffes en fleur sur talus exposé sud",
        speciesId: genepi.id,
        zoneId: plateau.id,
      },
      {
        quantity: 6,
        notes: "Troupeau de mâles en altitude",
        speciesId: bouquetin.id,
        zoneId: plateau.id,
      },
      {
        quantity: 1,
        notes: "Rapace en chasse observé depuis le sentier",
        speciesId: aigle.id,
        zoneId: forest.id,
      },
    ],
  });
  console.log("SEED TERMINÉ");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
