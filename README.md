## Como ejecutar la API

### Configuracion de las variables de entorno

Crear un archivo `.env` en la raiz del directorio y añadir lo siguiente sin comillas ni punto y coma:

```javascript

DB_HOST = nombre del  host
DB_USER = usuario de la db
DB_DATABASE = nombre de la db
DB_PASSWORD = la contraseña
PORT = 4000 o cuaquier otro puerto

```

--------
### Comandos para iniciar el servidor de NodeJS

- Si se ejecuta por primera vez se deben instalar las dependencias con : 
`npm i`

- Para iniciar en modo de desarrollo con nodemon: 
`npm run dev`

- Para iniciar en modo de produccion : 
`npm start`


