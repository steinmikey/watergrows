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

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Plants.getPlantById(id)
    .then((plant) => {
      if (plant.owner === req.decoded.subject) {
        res.json(plant);
      } else {
        next({ status: 401, message: `not this user's plant` });
      }
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  res.json({ message: "hitting edit plant endpoint" });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: "hitting delete plant endpoint" });
});

module.exports = router;
