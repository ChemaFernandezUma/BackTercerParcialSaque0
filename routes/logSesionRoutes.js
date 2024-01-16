//crud logs sesion
const express = require('express');
const router = express.Router();
const logSesionSchema = require("../models/logSesion");
const axios = require('axios');
//CRUD LOGS SESION
//Get
router.get("/", async (req, res) => {
    try {
        const data = await logSesionSchema.find();
        // Ordenar los resultados en el lado del cliente
        const sortedData = data.sort((a, b) => b.caducidad - a.caducidad);
        res.json(sortedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get by id
router.get("/:id", async (req, res) => {
    logSesionSchema.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
//Post
router.post("/", async (req, res) => {
    logSesionSchema.create(req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
//Put
router.put("/:id", async (req, res) => {
    logSesionSchema.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
//Delete
router.delete("/:id", async (req, res) => {
    logSesionSchema.findByIdAndDelete(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get by email
router.get("/email/:email", async (req, res) => {
    logSesionSchema.find({ usuario: req.params.email }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

// Mediante un enlace o botón la aplicación mostrará el contenido completo del log, en orden
// descendente de timestamp.

module.exports = router;