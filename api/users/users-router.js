const router = require("express").Router();
// const bcrypt = require("bcryptjs");

const { getAllUsers, createUser } = require("./users-model");

// const Users = require("../users/users-model");
// const buildToken = require("../auth/token-builder");

router.get("/", async (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.post("/", async (req, res) => {
  res.status(201).json(await createUser(req.body));
});

module.exports = router;
