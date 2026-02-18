import express from "express";
import dotenv from "dotenv";

dotenv.config();

import "./Config/DataBase.js"; // juste pour initialiser la connexion + logs

import advertisementsRoutes from "./routes/Advertisements.js";
import applicationsRoutes from "./routes/Applications.js";
import companiesRoutes from "./routes/Companies.js";
import peopleRoutes from "./routes/People.js";

import globalErrorHandler from "./middleware/Error.js"; // adapte si ton fichier s'appelle autrement

const app = express();

app.use(express.json());

console.log("🔥 server.js lancé");

// route test
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

// mount routes (tu peux garder tes chemins actuels)
app.use(advertisementsRoutes);
app.use("/applications", applicationsRoutes);
app.use(companiesRoutes);
app.use(peopleRoutes);

// error handler (toujours à la fin)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});