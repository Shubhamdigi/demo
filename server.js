const express = require("express");
const app = express();
const routes = require("./router/routes.js");
const http = require("http");
const port = 8000;

const db = require('./models/index');
db.sequelize.sync();


const server = http.createServer(app);

app.use("/api", routes);

server.listen(port);
server.on("listening", () => {
  console.log(`The server has started on port: ${port}`);
});
