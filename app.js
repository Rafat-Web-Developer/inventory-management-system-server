const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/product.route");

app.use(express.json());
app.use(cors());

// -----------root route---------
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

/**
 * @routes -> All Routes
 * @version 1.0.0
 * ...
 */
app.use("/api/v1/products", productRoutes);

module.exports = app;
