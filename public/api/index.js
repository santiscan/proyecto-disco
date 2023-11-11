const express = require("express");
const app = express();
const routes = require("./routes/index.js");
app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000 ... IT'S ALIVEE!");
});
