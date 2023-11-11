const express = require("express");
const router = express.Router();
const Album = require("../models/Album.js");

// ruta para ver todos los albums
router.get("/", async (req, res) => {
  try {
    let albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al buscar los albums");
  }
});

// ruta para agregar un album
router.post("/", async (req, res) => {
  try {
    await Album.create(req.body);
    res.status(200).send("album creado exitosamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("error al crear el album");
  }
});

// ruta para editar un album.
router.put("/:id", async (req, res) => {
  try {
    let editedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(editedAlbum);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al editar un album");
  }
});

// ruta que devuelva la información de un album especifíco.
router.get("/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    res.status(200).send(album);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al buscar el id del album");
  }
});

// ruta para eliminar un album.
router.delete("/:id", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).send("album eliminado exitosamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("error al borrar el album");
  }
});

// Una ruta para agregar una canción del album.
router.post("/addSong/:id/", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    album.songs.push(req.body);
    await album.save();
    console.log(album);
    res.status(200).send(album);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al agregar cancion al album");
  }
});

// Una ruta para eliminar una canción del album.
router.post("/removeSong/:id/:songName", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    let songs = album.songs;
    for (let i = 0; i < songs.length; i++) {
      if (songs[i]["title"] === req.params.songName) {
        songs.splice(i, 1);
      }
    }
    await album.save();
    console.log(album);
    res.status(200).send(album);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al eliminar cancion al album");
  }
});

// ruta para buscar canciones
router.get("/song/:albumid/:songid", async (req, res) => {
  try {
    let album = await Album.findById(req.params.albumid);
    let song = album.songs.id(req.params.songid);
    console.log(song);
    res.status(200).send(song);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
