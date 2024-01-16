const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');
const fileUpload = multer();
const cloudinary = require('cloudinary');
const eventosRoutes = require("./routes/eventosRoutes");
const logSesionRoutes = require("./routes/logSesionRoutes");
const streamifier = require('streamifier');

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());    


cloudinary.config({ 
    cloud_name: 'dgqruvvjr', 
    api_key: '961825855861132', 
    api_secret: 'OMToah82AGwg_ZlI5FiSZ2IYQOU' 
  });


  app.post('/subir', fileUpload.single('imagen'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (result, error) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
  
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
  
    async function upload(req) {
      try {
        let result = await streamUpload(req);
        res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
      } catch (error) {
        console.log('Error al subir la imagen: ', error)
        res.status(500).json({ message: 'Error al subir la imagen:', error});
      }
    }
  
    upload(req);
  });










app.use("/eventos", eventosRoutes);
app.use("/logs", logSesionRoutes);
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