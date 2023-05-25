import app from "./app.js";

const main = () => {
    app.listen(app.get("port"));
    console.log(`Servidor corriendo en ${app.get("port")}`);
};

main();
//Ejecutar esta aplicacion con npm run dev en consola