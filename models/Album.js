const mongoose = require("mongoose");

const Album = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El titulo del album es requerido"],
    lowercase: [true, "El titulo del album debe estar en minusculas"],
    trim: true,
  },
  description: {
    type: String,
    maxLength: [200, "La descripción puede tener como máximo 200 caracteres"],
  },
  releaseYear: {
    type: Number,
    min: [0, "El año de lanzamiento no puede ser negativo"],
  },
  songs: [
    {
      title: { type: String },
      duration: { type: Number },
    },
  ],
  coverImage: {
    type: String,
    required: [true, "El album debe contener una imagen de portada"],
  },
});

module.exports = mongoose.model("Album", Album);
