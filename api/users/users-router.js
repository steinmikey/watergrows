const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { validateCredens, uniqueUsername } = require("./users-middleware");
const { restrict } = require("../auth/auth-middleware");

const Users = require("../users/users-model");
const buildToken = require("../auth/token-builder");

///// this route will go away
router.get("/", async (req, res, next) => {
  Users.getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

// router.post("/", async (req, res) => {
//   res.status(201).json(await createUser(req.body));
// });

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

router.put("/:username/reset_password", restrict, (req, res, next) => {
  console.log("alright");
  console.log(req.params.username, req.decoded.username);
  console.log("user_id", req.decoded.subject, typeof req.decoded.subject);

  if (req.params.username === req.decoded.username) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    Users.updateUserPassword(req.decoded.subject, hash)
      .then(() => {
        console.log("mmk");
        res.status(202).json({ message: "password updated successfully" });
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

router.delete("/delete", restrict, (req, res, next) => {
  res.json({ message: "hitting delete endpoint" });
});

module.exports = router;
