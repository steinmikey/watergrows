const router = require("express").Router();
// const bcrypt = require("bcryptjs");

const { getAllUsers, createUser } = require("./users-model");

// const Users = require("../users/users-model");
// const buildToken = require("../auth/token-builder");

router.get("/", async (req, res) => {
  res.json(await getAllUsers());
});

router.post("/", async (req, res) => {
  res.status(201).json(await createUser(req.body));
});

module.exports = router;
