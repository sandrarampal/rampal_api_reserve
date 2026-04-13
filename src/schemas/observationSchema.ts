import z from "zod";

export const createObservationSchema = z.object({
  body: z.object({
    quantity: z
      .number()
      .int("La quantité doit être un nombre entier")
      .min(1, "La quantité minimum est de 1"),
    notes: z.string().optional(),
    speciesId: z.number().int("Id d'espèce invalide"),
    zoneId: z.number().int("Id d'espèce invalide"),
  }),
});

export const updateObservationSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
  body: z.object({
    quantity: z
      .number()
      .int("La quantité doit être un nombre entier")
      .min(1, "La quantité minimum est de 1")
      .optional(),
    notes: z.string().optional(),
    speciesId: z.number().int("Id d'espèce invalide").optional(),
    zoneId: z.number().int("Id d'espèce invalide").optional(),
  }),
});

export const getObservationSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("L'ID n'est pas valide")
      .positive("L'ID n'est pas valide"),
  }),
});

export const getObservationsQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((str) => parseInt(str, 10))
      .pipe(z.number().int().min(1).max(100))
      .default(1)
      .optional(),
    perPage: z
      .string()
      .transform((str) => parseInt(str, 10))
      .pipe(z.number().int().min(1).max(100))
      .default(10)
      .optional(),
    speciesId: z.number().int("Id d'espèce invalide").optional(),
    zoneId: z.number().int("Id d'espèce invalide").optional(),
  }),
});

export type CreateObservationBody = z.infer<
  typeof createObservationSchema
>["body"];
export type UpdateObservationBody = z.infer<
  typeof updateObservationSchema
>["body"];
export type GetObservationQuery = z.infer<
  typeof getObservationsQuerySchema
>["query"];
