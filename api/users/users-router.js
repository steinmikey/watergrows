const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { validateCredens, uniqueUsername } = require("./users-middleware");
const { restrict } = require("../auth/auth-middleware");

const Users = require("../users/users-model");
const buildToken = require("../auth/token-builder");

///// this route will go away ///////////
router.get("/", async (req, res, next) => {
  Users.getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});
/////////////////////////////////////////

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

router.put("/reset_password/:username", restrict, (req, res, next) => {
  if (req.params.username === req.decoded.username) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    Users.updateUserPassword(req.decoded.subject, hash)
      .then((user) => {
        res.status(202).json({ message: "password reset successful", user });
      })
      .catch(next);
  } else {
    next({ status: 401, message: "unauthorized" });
  }
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

router.delete("/delete/:username", restrict, (req, res, next) => {
  if (req.params.username === req.decoded.username) {
    Users.deleteUser(req.decoded.subject)
      .then(res.status(200).json({ message: `account successfully deleted` }))
      .catch(next);
  } else {
    next({ status: 401, message: "unauthorized" });
  }
});

module.exports = router;
