import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/client";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);

  // Erreur Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  //   Erreurs Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        res.status(404).json({
          message: "Enregistrement non trouvé",
        });
        break;
      case "P2002":
        res.status(409).json({
          message: "Contrainte unique violée",
        });
        break;
      case "P2003":
        res.status(400).json({
          message: "contrainte de foreign key violée",
        });
        break;
    }
  }

  // Erreur générique
  res.status(500).json({ message: "Erreur interne du serveur" });
};

export default errorHandler;
