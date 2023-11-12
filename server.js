const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const password = process.env.PASSWORD;

// const routes = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const bandsRouter = require("./routes/bands.js");
const indexRouter = require("./routes/index.js");

const url = `mongodb+srv://santiagoscanlan:${password}@plataforma-disco.gqjk0t7.mongodb.net/?retryWrites=true&w=majority`;
const Album = require("./models/Album.js");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");

// MIDDLEWARES
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/band", bandsRouter);
app.use("/health", (req, res) => res.sendStatus(200));

// CONNECTION TO DB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log(`Server on port ${port} and DB connected!`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();
