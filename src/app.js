import express from "express";
import morgan from "morgan";
import config from "./config.js";

// Routes
//import languageRoutes from "./routes/language.routes";
import usuarioRoutes from "./routes/usuarios.routes.js";

const app = express();

// Settings
app.set("port", config.port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
//app.use("/api/languages", languageRoutes);
app.use("/api/usuarios", usuarioRoutes)


export default app;
