const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const multer = require("multer");
const mongoose = require("mongoose");

//ROUTE 1: Get All the Notes Using : GET "/api/categories/fetchallcategories". Login required

router.get("/fetchallcategories", (req, res, next) => {
  Category.find()
    .populate("plansId")
    .then((item) => {
      res.status(200).json({
        categoriesData: item,
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
  Category.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        categories: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

router.post("/fetchallcategories", upload, (req, res, next) => {
  const categories = new Category({
    plansId: req.body.plansId,
    category: req.body.category,
    code: req.body.code,
    description: req.body.description,
    image: req.file.filename,
    status: req.body.status,
  });

  categories
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newCategories: item,
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
