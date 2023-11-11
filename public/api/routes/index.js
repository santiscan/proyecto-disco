const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hola!");
});

router.get("/chau", (req, res) => {
  res.status(200).send("Chau chau");
});

router.get("/prueba", (req, res) => {
  res.status(200).send({ nombre: "James", apellido: "Bond" });
});

module.exports = router;
