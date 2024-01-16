const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');
const cloudinary = require('cloudinary');
const eventosRoutes = require("./routes/eventosRoutes");
const logSesionRoutes = require("./routes/logSesionRoutes");
const cloudRoutes = require("./routes/cloudRoutes");
const app = express();
const port = 5001;
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

          
cloudinary.config({ 
  cloud_name: 'dgqruvvjr', 
  api_key: '961825855861132', 
  api_secret: 'OMToah82AGwg_ZlI5FiSZ2IYQOU' 
});









app.use("/eventos", eventosRoutes);
app.use("/logs", logSesionRoutes);
app.use("/cloud", cloudRoutes);
mongoose.connect(
    "mongodb+srv://userWeb:userWeb@exameweb.ci2qqri.mongodb.net/datosEx").then(() =>
        console.log("Hemos conectado con mongoDB")
    ).catch((error) =>
        console.error(error)
    )


app.get("/", (req, res) => {
    res.send("Esta es la API del examen de Web")
}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))