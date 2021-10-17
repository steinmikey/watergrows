const db = require("../../data/db-config");

async function getUsersPlants(id) {
  console.log("model", id);
  const plants = await db("plants").select("id", "nickname", "species", "h2oFrequency", "img_URL").where("owner", id);
  return plants;
}

async function addPlant(plant) {
  const [newPlant] = await db("plants").insert(plant, ["id", "nickname", "species", "h2oFrequency", "img_URL"]);
  return newPlant;
}

function updatePlant() {}

function deletePlant() {}

module.exports = {
  getUsersPlants,
  addPlant,
  updatePlant,
  deletePlant
};
