const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { validateLogin, uniqueUsername, validateRegister } = require("./users-middleware");
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

router.post("/register", uniqueUsername, validateRegister, (req, res, next) => {
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

router.put("/update-account/:username", restrict, (req, res, next) => {
  const { password, phone } = req.body;
  const changes = {};
  if (req.params.username === req.decoded.username) {
    if (password) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcrypt.hashSync(password, rounds);
      changes.password = hash;
    }
    if (phone) {
      changes.phone = phone;
    }

    Users.updateUserAccount(req.decoded.subject, changes)
      .then((user) => {
        res.status(202).json({ message: "update successful", user });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next({ status: 401, message: "unauthorized" });
  }
});

router.post("/login", validateLogin, (req, res, next) => {
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

router.delete("/:username", restrict, (req, res, next) => {
  if (req.params.username === req.decoded.username) {
    Users.deleteUser(req.decoded.subject)
      .then(res.status(200).json({ message: `account successfully deleted` }))
      .catch(next);
  } else {
    next({ status: 401, message: "unauthorized" });
  }
});

module.exports = router;
