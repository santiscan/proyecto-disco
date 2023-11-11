// NO SE ESTA USANDO

const mongoose = require("mongoose");

const Song = new mongoose.Schema({
  name: { type: String },
  duration: { type: Number },
});

module.exports = mongoose.model("Song", Song);
