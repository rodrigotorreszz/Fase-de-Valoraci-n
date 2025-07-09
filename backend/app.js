import express from "express";
import cors from "cors";  
import swaggerUi from "swagger-ui-express";  
import fs from "fs";
import path from "path";

import clientsRoutes from "./src/routes/ClienteRoutes.js";
import reservationsRoutes from "./src/routes/ReservaRoutes.js";

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "*", 
  credentials: true,  
}));

// Permitir el uso de JSON
app.use(express.json());

// Leemos el archivo Swagger para la documentación
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./partPlus.json"), "utf-8")
);

// Rutas para los clientes y las reservas
app.use("/api/clients", clientsRoutes);  
app.use("/api/reservations", reservationsRoutes);

// Ruta para la documentación Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir un puerto dinámico: Si el puerto 4000 está ocupado, se usa el 4001
const port = process.env.PORT || 4000;  // Si no hay una variable de entorno PORT, usa 4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
