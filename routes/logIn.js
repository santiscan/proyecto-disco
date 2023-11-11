// NO SE ESTA USANDO
// NO SE ESTA USANDO

const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "hola";

// enviar informacion de login
router.post("/", async (req, res) => {
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
      console.log("los passwords coinciden");
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

module.exports = router;
