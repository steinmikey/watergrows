const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const restrict = require("./auth/auth-middleware");

const usersRouter = require("./users/users-router");
const plantsRouter = require("./plants/plants-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use(
  "/api/plants",
  // restrict,
  plantsRouter
);

server.use("*", (request, response, next) => {
  next({ status: 404, message: "not found!" });
});

// eslint-disable-next-line
server.use((error, request, response, _next) => {
  response.status(error.status || 500).json({
    message: error.message || "server error"
  });
});

module.exports = server;
