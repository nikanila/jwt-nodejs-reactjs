import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser());

//test connection db
// connection();

initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`JWT Backend is running on the port ${PORT}`);
});
