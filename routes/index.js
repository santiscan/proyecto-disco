const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Album = require("../models/Album.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "hola";

// enviar informacion de login
router.post("/login", async (req, res) => {
  try {
    let userCredentials = req.body;
    let { _id, name, surname, email, password } = await User.findOne({
      email: userCredentials.email,
    });

    let passwordsMatch = await bcrypt.compare(
      userCredentials.password,
      password
    );
    let payload = { _id, name, surname, email };

    if (passwordsMatch) {
      console.log("PAGINA LOGIN: los passwords coinciden");
      let token = jwt.sign(payload, secret, { expiresIn: "24h" });
      res.cookie("token", token);
      res.status(200).send(payload);
    } else {
      console.log("los passwords no coinciden");
      res.status(401).send("los passwords no coindicen");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(204).send("cookie de sesion eliminada");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = await jwt.verify(token, secret);
    res.send(payload);
  } catch (error) {
    res.status(401).send(error);
  }
});

// ESTO ESTA EN SUS ARCHIVOS DE RUTAS CORRESPONDIENTES
// buscar todos los usuarios
// router.get("/user", async (req, res) => {
//   try {
//     let users = await User.find();
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send("error al buscar todos los usuarios en la DB");
//   }
// });

// // crear un usuario
// router.post("/user", async (req, res) => {
//   try {
//     await User.create(req.body);
//     res.status(201).send("usuario creado exitosamente");
//   } catch (error) {
//     res.status(500).send("error al crear un usuario");
//   }
// });

// // retornar data del usuario sin contraseña
// router.get("/user/:id", async (req, res) => {
//   try {
//     let user = await User.findById(req.params.id).select("-password");
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send("error al buscar en la DB");
//   }
// });

// // ruta para editar los datos de un usuario
// router.put("/user/:id", async (req, res) => {
//   try {
//     let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).send(updatedUser);
//   } catch (error) {
//     res.status(500).send("error al actualizar la DB");
//   }
// });

// // ruta para ver todos los albums
// router.get("/band", async (req, res) => {
//   try {
//     let albums = await Album.find();
//     res.status(200).send(albums);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al buscar los albums");
//   }
// });

// // ruta para agregar un album
// router.post("/band", async (req, res) => {
//   try {
//     await Album.create(req.body);
//     res.status(200).send("album creado exitosamente");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al crear el album");
//   }
// });

// // ruta para editar un album.
// router.put("/band/:id", async (req, res) => {
//   try {
//     let editedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).send(editedAlbum);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al editar un album");
//   }
// });

// // ruta que devuelva la información de un album especifíco.
// router.get("/band/:id", async (req, res) => {
//   try {
//     let album = await Album.findById(req.params.id);
//     res.status(200).send(album);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al buscar el id del album");
//   }
// });

// // ruta para eliminar un album.
// router.delete("/band/:id", async (req, res) => {
//   try {
//     await Album.findByIdAndDelete(req.params.id);
//     res.status(204).send("album eliminado exitosamente");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al borrar el album");
//   }
// });

// // Una ruta para agregar una canción del album.
// router.post("/band/addSong/:id/", async (req, res) => {
//   try {
//     let album = await Album.findById(req.params.id);
//     album.songs.push(req.body);
//     await album.save();
//     console.log(album);
//     res.status(200).send(album);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al agregar cancion al album");
//   }
// });

// // Una ruta para eliminar una canción del album.
// router.post("/band/removeSong/:id/:songName", async (req, res) => {
//   try {
//     let album = await Album.findById(req.params.id);
//     let songs = album.songs;
//     for (let i = 0; i < songs.length; i++) {
//       if (songs[i]["title"] === req.params.songName) {
//         songs.splice(i, 1);
//       }
//     }
//     await album.save();
//     console.log(album);
//     res.status(200).send(album);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error al eliminar cancion al album");
//   }
// });

// // ruta para buscar canciones
// router.get("/song/:albumid/:songid", async (req, res) => {
//   try {
//     let album = await Album.findById(req.params.albumid);
//     let song = album.songs.id(req.params.songid);
//     console.log(song);
//     res.status(200).send(song);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

module.exports = router;
