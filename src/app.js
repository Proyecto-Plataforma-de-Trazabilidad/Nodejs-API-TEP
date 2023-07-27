import express from "express";
import morgan from "morgan";
import config from "./config.js";

// Routes Import 
//import languageRoutes from "./routes/language.routes";
import usuarioRoutes from "./routes/usuarios.routes.js";
import consultasG from "./routes/consultasGenerares.routes.js"
import pushRoutes from "./routes/pushNotification.routes.js"

const app = express();

// Settings
app.set("port", config.port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes en la API
app.use("/api/usuarios", usuarioRoutes);
app.use(consultasG);
app.use(pushRoutes);


export default app;
