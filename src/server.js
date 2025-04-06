import express from "express";
import configViewEngine from "./configs/viewEngine";
import initwebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
// config view engine
configViewEngine(app);

//test connect db
connection();
//init web routes
initwebRoutes(app);

// body parser

app.listen(PORT, () => {
    console.log("JWT Backend is running on the port = ", PORT);
})