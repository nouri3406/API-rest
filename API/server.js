import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

import "./Config/DataBase.js";

import advertisementsRoutes from "./routes/Advertisements.js";
import applicationsRoutes from "./routes/Applications.js";
import companiesRoutes from "./routes/Companies.js";
import peopleRoutes from "./routes/People.js";

import globalErrorHandler from "./middleware/Error.js";

const app = express();
app.use(express.json());

console.log("🔥 server.js lancé");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Jobboard API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./API/routes/*.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

app.use(advertisementsRoutes);
app.use("/applications", applicationsRoutes);
app.use(companiesRoutes);
app.use(peopleRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));