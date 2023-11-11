const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

let passwordSaltRounds = 10;

// buscar todos los usuarios
router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("error al buscar todos los usuarios en la DB");
  }
});

// crear un usuario
router.post("/", async (req, res) => {
  try {
    let newUserData = req.body;
    newUserData["password"] = await hashPassword(
      req.body.password,
      passwordSaltRounds
    );

    await User.create(newUserData);
    res.status(201).send("usuario creado exitosamente");
  } catch (error) {
    console.log("user post error:", error);
    res.status(500).send(error.message);
  }
});

// retornar data del usuario sin contraseña
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ruta para editar los datos de un usuario
router.put("/:id", async (req, res) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send("error al actualizar la DB");
  }
});

async function hashPassword(password, saltRounds) {
  let hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

module.exports = router;
