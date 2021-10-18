const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { restrict } = require("./auth/auth-middleware");

const usersRouter = require("./users/users-router");
const plantsRouter = require("./plants/plants-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/plants", restrict, plantsRouter);

server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found!" });
});

server.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

// eslint-disable-next-line
server.use((err, req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || "server error"
  });
});

module.exports = server;
