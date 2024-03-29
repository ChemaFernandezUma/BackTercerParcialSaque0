// timestamp, usuario (email), caducidad (timestamp), token de identificación.
const mongoose = require('mongoose');
const logSesionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    caducidad: {
        type: Date,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('logSesion', logSesionSchema);