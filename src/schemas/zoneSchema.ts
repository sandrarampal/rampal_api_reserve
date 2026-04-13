import z from "zod";

const ZONETYPE = ["vallée", "forêt", "lac", "sommet", "prairie", "glacier"];

export const createZoneSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Le nom doit avoir deux caractères au minimum")
      .trim(),
    type: z.enum(ZONETYPE, { message: "Type de zone invalide" }),
    altitude: z
      .number()
      .int("L'altitude doit être un entier")
      .positive("L'altitude doit être un nombre positif")
      .optional(),
    description: z.string().optional(),
  }),
});

export const updateZoneSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Le nom doit avoir deux caractères au minimum")
      .trim()
      .optional(),
    type: z.enum(ZONETYPE, { message: "Type de zone invalide" }).optional(),
    altitude: z
      .number()
      .int("L'altitude doit être un entier")
      .min(0, "L'altitude doit être un nombre positif")
      .optional(),
    description: z.string().optional(),
  }),
});

export const getZoneSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
});

export type CreateZoneBody = z.infer<typeof createZoneSchema>["body"];
export type UpdateZoneBody = z.infer<typeof updateZoneSchema>["body"];
