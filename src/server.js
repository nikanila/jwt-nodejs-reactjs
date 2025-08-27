import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTAction";

const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

//test JWT
createJWT();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaG9hbiIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE3NTYzMDE5NzN9.AryhydKhV9abeS6fwVZfEQjOkYMYUk00ZacjGk4Q3Zk"
);
console.log(decodedData);

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(`JWT Backend is running on the port ${PORT}`);
});
