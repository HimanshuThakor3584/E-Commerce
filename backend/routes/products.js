const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const multer = require("multer");

//ROUTE 1: Get All the Notes Using : GET "/api/products/fetchallproducts". Login required

router.get("/fetchallproducts", (req, res, next) => {
  Product.find()
    .then((item) => {
      res.status(200).json({
        productsData: item,
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
  Product.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        Product: item,
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

router.post("/fetchallproducts", upload, (req, res) => {
  const products = new Product({
    categoryId: req.body.categoryId,
    name: req.body.name,
    code: req.body.code,
    bestsales: req.body.bestsales,
    price: req.body.price,
    details: req.body.details,
    image: req.file.filename,
    quentity: req.body.quentity,
    createdDate: req.body.createdDate,
    status: req.body.status,
  });
  products
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newProducts: item,
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
