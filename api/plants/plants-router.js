const router = require("express").Router();
const Plants = require("./plants-model");

router.get("/", (req, res, next) => {
  const id = req.decoded.subject;
  Plants.getUsersPlants(id)
    .then((plants) => {
      res.json(plants);
    })
    .catch(next);
});

//add middleware for req.body contents
router.post("/", (req, res, next) => {
  const id = req.decoded.subject;
  Plants.addPlant(id, req.body)
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch(next);
});

module.exports = router;
