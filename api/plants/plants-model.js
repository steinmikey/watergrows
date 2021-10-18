const db = require("../../data/db-config");

async function getUsersPlants(user_id) {
  const plants = await db("plants")
    .select("id", "nickname", "species", "h2oFrequency", "img_URL")
    .where("owner", user_id);
  return plants;
}

async function getPlantById(plant_id) {
  const plant = await db("plants")
    .select("id", "nickname", "species", "h2oFrequency", "img_URL", "owner")
    .where("id", plant_id)
    .first();
  return plant;
}

async function addPlant(user_id, plant) {
  const plantWithId = {
    ...plant,
    owner: user_id
  };
  const [newPlant] = await db("plants").insert(plantWithId, ["id", "nickname", "species", "h2oFrequency", "img_URL"]);
  return newPlant;
}

function updatePlant() {}

function deletePlant() {}

module.exports = {
  getUsersPlants,
  getPlantById,
  addPlant,
  updatePlant,
  deletePlant
};
