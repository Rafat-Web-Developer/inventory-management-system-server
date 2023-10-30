const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Product name must be unique"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this product"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be nagative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        value: ["kg", "pcs", "litre"],
        message: "Unit must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Must provide product quantity"],
      default: 0,
      min: [, "Quantity can't be nagative"],
      validate: {
        validator: (value) => {
          const valueIsInteger = Number.isInteger(value);
          if (valueIsInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        value: ["in-stock", "out-of-stock"],
        message: "Status must be (in-stock/out-of-stock)",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
