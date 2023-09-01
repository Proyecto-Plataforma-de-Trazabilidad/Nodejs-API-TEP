import express from "express";
import morgan from "morgan";
import config from "./config.js";
import cors from "cors";
import cron from "node-cron";
import axios from 'axios';

// Routes Import 
//import languageRoutes from "./routes/language.routes";
import usuarioRoutes from "./routes/usuarios.routes.js";
import consultasG from "./routes/consultasGenerares.routes.js"
import pushRoutes from "./routes/pushNotification.routes.js"

// Methods Import 
import { methods as Tareas } from "./controllers/cronJobs.controller.js";


const app = express();


//Cron Jobs (tareas automatizadas)
// let task = cron.schedule("0 8 * * 0-7", () => {
//     //Actualizar el nivel de las alertas
//     Tareas.obtenerAlerta().then(alertas => {

//         alertas.map(alerta => {

//             if (alerta.Semanas == 2 && alerta.NivelFecha == 'Verde') {
//                 console.log("Sube a nivel amarillo:" + alerta.IdAlerta);

//                 Tareas.actualizarNivel(alerta.IdAlerta, 'Amarillo').then(res => { //Función que actualiza el nivel de la alerta

//                     if (res == 'todoCorrecto') {
//                         axios.post('https://nodejs-api-tep-production.up.railway.app/serviciopush/enviar', {
//                             opcion: "PorTipoUsuario",
//                             parametros: 'Amocali',
//                             titulo: "Alerta de recolección",
//                             cuerpo: `La alerta ${alerta.IdAlerta} subió a nivel Amarillo`,
//                             url: "https://campolimpiojal.com/Alertas/alertaGeneradasDist.php"
//                         })
//                             .then(response => {
//                                 console.log(response.data);
//                             })
//                             .catch(error => { console.log(error); });
//                     } //Fin del if

//                 });//Fin de la funcion actualiza

//             } else if (alerta.Semanas > 3 && alerta.NivelFecha == 'Amarillo') {
//                 console.log("Sube a nivel rojo:" + alerta.IdAlerta);

//                 Tareas.actualizarNivel(alerta.IdAlerta, 'Rojo').then(res => { //Función que actualiza el nivel de la alerta

//                     if (res == 'todoCorrecto') {
//                         axios.post('https://nodejs-api-tep-production.up.railway.app/serviciopush/enviar', {
//                             opcion: "PorTipoUsuario",
//                             parametros: 'Amocali',
//                             titulo: "Alerta de recolección",
//                             cuerpo: `La alerta ${alerta.IdAlerta} subió a nivel Rojo`,
//                             url: "https://campolimpiojal.com/Alertas/alertaGeneradasDist.php"
//                         })
//                             .then(response => {
//                                 console.log(response.data);
//                             })
//                             .catch(error => { console.log(error); });
//                     } //Fin del if

//                 });//Fin de la funcion actualiza
//             }

//         });

//     });


// });

// Tareas.comprobarAlerta().then(datos => {
//     console.log(datos.NoAlertas);
//     if (datos.NoAlertas > 0)
//         task.start();

// })

//Fetch Cat API
axios.get('https://api.thecatapi.com/v1/images/search')
    .then(response => {

        //Envia saludo
        axios.post('https://nodejs-api-tep-production.up.railway.app/serviciopush/enviar', {
            opcion: "PorTipoUsuario",
            parametros: 'Amocali',
            titulo: "Buenos Dias",
            cuerpo: `Ya levántate HUEVON`,
            url: "https://campolimpiojal.com/",
            imagen: response.data[0].url
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => { console.log(error); });

    })
    .catch(error => { console.log(error); });


// Settings
app.set("port", config.port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes en la API
app.use("/api/usuarios", usuarioRoutes);
app.use(consultasG);
app.use(pushRoutes);


export default app;
