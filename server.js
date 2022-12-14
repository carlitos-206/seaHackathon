const express = require("express");
const routes = require("./routes");
const cors = require("cors");
// cors updated to allow all origins
const corsOptions = {origin:'*', methods: ["GET", "POST", "PUT", "DELETE"]};

const server = express();
server.use(express.json());
server.use(cors(corsOptions));
// server.use((req, res, next) => {
//   re.header('Access-Control-Allow-Origin', '*');
//   next();
// });
server.use(routes);

module.exports = server;