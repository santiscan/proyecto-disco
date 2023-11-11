const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
// const routes = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const bandsRouter = require("./routes/bands.js");
const indexRouter = require("./routes/index.js");

const url =
  "mongodb+srv://santiagoscanlan:plataforma5@plataforma-disco.gqjk0t7.mongodb.net/?retryWrites=true&w=majority";
const Album = require("./models/Album.js");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/band", bandsRouter);

// CONNECTION TO DB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(8000, () => {
      console.log("Server on port 8000 and DB connected!");
    });
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();
