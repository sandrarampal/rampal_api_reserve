import express from "express";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler";
import zoneRoutes from "./routes/zoneRoutes";
import speciesRoutes from "./routes/speciesRoutes";
import observationRoutes from "./routes/observationRoutes";

const app = express();
app.use(express.json());

app.use("/api/zones", zoneRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/observations", observationRoutes);

app.use(errorHandler);

app.get("/", (_req, res) => {
  res.json({ message: "API Réserve naturelle" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
