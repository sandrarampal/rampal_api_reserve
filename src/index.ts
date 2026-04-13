import express from "express";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.json({ message: "API Réserve naturelle" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
