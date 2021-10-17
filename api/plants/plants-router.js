const router = require("express").Router();
const { getUsersPlants, addPlant } = require("./plants-model");

router.get("/", (req, res, next) => {
  const id = req.decoded.subject;
  getUsersPlants(id)
    .then((plants) => {
      res.json(plants);
    })
    .catch(next);
});

module.exports = router;
