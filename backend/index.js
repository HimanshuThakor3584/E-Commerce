const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Plans = require("./models/Plans");
const BillingAddress = require("./models/BillingAddress");
const multer = require("multer");

// mongoose.set('strictQuery', true);
mongoose.set("strictQuery", false);

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/plans", require("./routes/plans"));
app.use("/api/billingaddress", require("./routes/billingaddress"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/orderitems", require("./routes/orderitems"));
app.use("/api/orderinvoice", require("./routes/orderinvoice"));
app.use("/public/img", express.static("./public/img"));

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

app.put("/category/:id", upload, async (req, resp) => {
  let result = await Category.updateOne(
    { _id: req.params.id },
    {
      plansId: req.body.plansId,
      category: req.body.category,
      code: req.body.code,
      description: req.body.description,
      image: req.file.filename,
      createdDate: req.body.createdDate,
      status: req.body.status,
    }
  );
  resp.send(result);
});
app.get("/category/:id", async (req, resp) => {
  let result = await Category.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.put("/product/:id", upload, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
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
    }
  );
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.put("/plan/:id", async (req, resp) => {
  let result = await Plans.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      discounttype: req.body.discounttype,
      discount: req.body.discount,
      startplan: req.body.startplan,
      endplan: req.body.endplan,
      status: req.body.status,
    }
  );
  resp.send(result);
});
app.get("/plan/:id", async (req, resp) => {
  let result = await Plans.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.get("/billingaddress/:id", async (req, resp) => {
  let result = await BillingAddress.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.listen(port, () => {
  console.log(`Example App Listing http://localhost:${port}`);
});
