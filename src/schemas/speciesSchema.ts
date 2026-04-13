import z from "zod";

const SPECIES_TYPE = [
  "mammifère",
  "oiseau",
  "reptile",
  "amphibien",
  "insecte",
  "plante",
];
const PROTECTION_STATUS = ["LC", "NT", "VU", "EN", "CR"];

export const createSpeciesSchema = z.object({
  body: z.object({
    commonName: z
      .string()
      .min(2, "Le nom doit avoir deux caractères au minimum")
      .trim(),
    scientificName: z
      .string()
      .min(5, "Le nom doit avoir cinq caractères au minimum")
      .trim(),
    type: z.enum(SPECIES_TYPE, { message: "Type d'espèce invalide" }),
    protectionStatus: z.enum(PROTECTION_STATUS, { message: "Statut invalide" }),
  }),
});

export const updateSpeciesSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
  body: z.object({
    commonName: z
      .string()
      .min(2, "Le nom doit avoir deux caractères au minimum")
      .trim()
      .optional(),
    scientificName: z
      .string()
      .min(5, "Le nom doit avoir cinq caractères au minimum")
      .trim()
      .optional(),
    type: z
      .enum(SPECIES_TYPE, { message: "Type d'espèce invalide" })
      .optional(),
    protectionStatus: z
      .enum(PROTECTION_STATUS, { message: "Statut invalide" })
      .optional(),
  }),
});

export const getSpeciesSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
});

export const getSpeciesQuerySchema = z.object({
  query: z.object({
    type: z
      .enum(SPECIES_TYPE, { message: "Type d'espèce invalide" })
      .optional(),
    status: z
      .enum(PROTECTION_STATUS, { message: "Statut invalide" })
      .optional(),
  }),
});

export type CreateSpeciesBody = z.infer<typeof createSpeciesSchema>["body"];
export type UpdateSpeciesBody = z.infer<typeof updateSpeciesSchema>["body"];
export type GetSpeciesQuery = z.infer<typeof getSpeciesQuerySchema>["query"];
