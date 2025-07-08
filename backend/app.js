import express from "express";

import clientsRoutes from "./src/routes/ClienteRoutes.js";
import reservationsRoutes from "./src/routes/ReservaRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/clients", clientsRoutes);
app.use("/api/reservations", reservationsRoutes);

export default app;
