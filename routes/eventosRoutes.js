const express = require('express');
const router = express.Router();
const eventoSchema = require("../models/eventos");
const axios = require('axios');
//CRUD EVENTOS
//Get
router.get("/", async (req, res) => {
    eventoSchema.find().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get by id
router.get("/:id", async (req, res) => {
    eventoSchema.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Post
router.post("/", async (req, res) => {
    eventoSchema.create(req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Put
router.put("/:id", async (req, res) => {
    eventoSchema.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Delete
router.delete("/:id", async (req, res) => {
    eventoSchema.findByIdAndDelete(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});


// lista de
// eventos próximos (aquellos con coordenadas lat, lon distantes menos de 0.2 unidades del lugar
// indicado), ordenados por timestamp6
router.get("/proximos/:lat/:lon", async (req, res) => {
    eventoSchema.find().then((data) => {
        let lista = [];
        data.forEach(element => {
            if (Math.abs(element.lat - req.params.lat) < 0.2 && Math.abs(element.lon - req.params.lon) < 0.2) {
                lista.push(element);
            }
        });
        lista.sort((a, b) => a.timestamp - b.timestamp);
        res.json(lista);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
module.exports = router;