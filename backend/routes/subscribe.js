const express = require("express");
const router = express.Router();
const Subscribe = require("../models/Subscribe");
const mongoose = require("mongoose");

//ROUTE 1: Get All the Notes Using : GET "/api/subscribe/fetchallsubscribe". Login required

router.get("/fetchallsubscribe", (req, res, next) => {
  Subscribe.find()
    .then((item) => {
      res.status(200).json({
        subscribeData: item,
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
  Subscribe.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        subscribeData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallsubscribe", (req, res) => {
  const subscribe = new Subscribe({
    email: req.body.email,
    date: req.body.date,
  });
  subscribe
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newSubscribe: item,
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
