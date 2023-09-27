const express = require("express");
const router = express.Router();
const Plans = require("../models/Plans");
const mongoose = require("mongoose");

//ROUTE 1: Get All the Notes Using : GET "/api/plans/fetchallplans". Login required

router.get("/fetchallplans", (req, res, next) => {
  Plans.find()
    .then((item) => {
      res.status(200).json({
        plansData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Plans.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        plansData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallplans", (req, res) => {
  const plans = new Plans({
    name: req.body.name,
    discounttype: req.body.discounttype,
    discount: req.body.discount,
    startplan: req.body.startplan,
    endplan: req.body.endplan,
    status: req.body.status,
  });
  plans
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newPlans: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
