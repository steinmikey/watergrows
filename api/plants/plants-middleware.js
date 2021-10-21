const Plants = require("./plants-model");
const Joi = require("joi");

// function checkPlantExists(req, res, next) {}

async function checkPlantOwner(req, res, next) {
  const id = req.params.id;
  const plant = await Plants.getPlantById(id);
  if (!plant) {
    next({ status: 404, message: "plant not found" });
  } else if (plant.owner === req.decoded.subject) {
    next();
  } else {
    next({ status: 401, message: "unauthorized, you cannot alter another user's plant" });
  }
}

async function validatePlant(req, res, next) {
  let update = req.body;
  const schema = Joi.object({
    nickname: Joi.string().max(30).required(),
    species: Joi.string().max(200).required(),
    h2oFrequency: Joi.string().max(200).required(),
    img_URL: Joi.string().allow("")
  });
  try {
    const validated = await schema.validateAsync(update);
    req.body = validated;
    next();
  } catch (err) {
    next({ status: 422, message: err.message });
  }
}

module.exports = {
  // checkPlantExists,
  checkPlantOwner,
  validatePlant
};
