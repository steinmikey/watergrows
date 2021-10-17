const { findBy } = require("../users/users-model");

async function uniqueUsername(req, res, next) {
  const { username } = req.body;
  const [existingUser] = await findBy({ username });
  if (existingUser) {
    next({ status: 422, message: "username taken" });
  } else {
    next();
  }
}

async function validateCredens(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 422, message: `username and password required` });
  } else {
    const [user] = await findBy({ username });
    req.body.user = user;
    next();
  }
}

module.exports = {
  validateCredens,
  uniqueUsername
};
