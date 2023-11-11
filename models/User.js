const mongoose = require("mongoose");
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//const Album = new mongoose.Schema({ albumName: String });

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: [2, "El nombre debe tener más de dos caracteres"],
  },
  surname: {
    type: String,
    required: [true, "El apellido es requerido"],
    minLength: [2, "El apellido debe tener más de dos caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    validate: {
      validator: function (email) {
        return regex.test(email);
      },
      message: "Debes ingresar un email valido, que contenga @",
    },
  },
  password: { type: String, required: [true, "El password es requerido"] },
  favouriteAlbums: [
    {
      albumName: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", User);
