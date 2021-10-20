const { findBy } = require("../users/users-model");
const Joi = require("joi");

async function uniqueUsername(req, res, next) {
  const { username } = req.body;
  const [existingUser] = await findBy({ username });
  if (existingUser) {
    next({ status: 422, message: "username taken" });
  } else {
    next();
  }
}

async function validateRegister(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string().allow("").min(10).max(20)
  }).with("username", "password");
  try {
    const validated = await schema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (err) {
    next({ status: 422, message: err.message });
  }
}

async function validateLogin(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().required()
  }).with("username", "password");
  try {
    const validated = await schema.validateAsync(req.body);
    req.body = validated;
    const { username } = req.body;
    const [user] = await findBy({ username });
    req.body.user = user;
    next();
  } catch (err) {
    next({ status: 422, message: err.message });
  }
}

module.exports = {
  validateLogin,
  uniqueUsername,
  validateRegister
};
