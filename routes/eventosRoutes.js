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



module.exports = router;