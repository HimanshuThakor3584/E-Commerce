const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const mongoose = require("mongoose");

//ROUTE 1: Get All the Notes Using : GET "/api/contacts/fetchallcontact". Login required

router.get("/fetchallcontact", (req, res, next) => {
  Contact.find()
    .then((item) => {
      res.status(200).json({
        contactsData: item,
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
  Contact.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        contactsData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallcontact", (req, res) => {
  const contact = new Contact({
    email: req.body.email,
    message: req.body.message,
    date: req.body.date,
  });
  contact
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newContacts: item,
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
