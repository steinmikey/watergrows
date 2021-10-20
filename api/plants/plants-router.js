const router = require("express").Router();
const Plants = require("./plants-model");
const { checkPlantOwner, validatePlant } = require("./plants-middleware");

router.get("/", (req, res, next) => {
  const id = req.decoded.subject;
  Plants.getUsersPlants(id)
    .then((plants) => {
      res.json(plants);
    })
    .catch(next);
});

router.post("/", validatePlant, (req, res, next) => {
  const user_id = req.decoded.subject;
  Plants.addPlant(user_id, req.body)
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

router.put("/:id", checkPlantOwner, async (req, res, next) => {
  const id = req.params.id;

  Plants.updatePlant(id, req.body)
    .then((plant) => {
      res.json(plant);
    })
    .catch(next);
});

// router.put("/:id", checkPlantOwner, async (req, res, next) => {
//   const id = req.params.id;
//   const plant = await Plants.getPlantById(id);
//   if (!plant) {
//     next({ status: 404, message: "plant not found" });
//   } else if (plant.owner === req.decoded.subject) {
//     Plants.updatePlant(id, req.body)
//       .then((plant) => {
//         res.json(plant);
//       })
//       .catch(next);
//   } else {
//     next({ status: 401, message: "unauthorized, you cannot update another user's plant" });
//   }
// });

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const plant = await Plants.getPlantById(id);
  if (!plant) {
    next({ status: 404, message: "plant not found" });
  } else if (plant.owner === req.decoded.subject) {
    Plants.deletePlant(id)
      .then(res.status(200).json({ message: `plant successfully deleted` }))
      .catch(next);
  } else {
    next({ status: 401, message: "unauthorized, you cannot delete another user's plant" });
  }
});

module.exports = router;
