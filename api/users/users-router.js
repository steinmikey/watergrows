const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { getAllUsers, createUser } = require("./users-model");
const { validateCredens, uniqueUsername } = require("./users-middleware");

const Users = require("../users/users-model");
const buildToken = require("../auth/token-builder");

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

router.post("/register", uniqueUsername, (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.createUser(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  // update user info
});

router.post("/login", validateCredens, (req, res, next) => {
  let { password, user } = req.body;

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = buildToken(user);
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: token
    });
  } else {
    next({ status: 401, message: `invalid credentials` });
  }
});

module.exports = router;
