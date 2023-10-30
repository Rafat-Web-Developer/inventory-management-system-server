const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// -----------Product Schema-----------
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
        values: ["kg", "pcs", "litre"],
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
        values: ["in-stock", "out-of-stock"],
        message: "Status must be (in-stock/out-of-stock)",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// -------------Middlewares-----------
productSchema.pre("save", function (next) {
  console.log("Before saving data.");
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

// ----------Instance----------
productSchema.methods.logger = function () {
  console.log("This is a instance");
};

// -----------create model-----------
const Product = mongoose.model("Product", productSchema);

// -----------root route---------
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// -----------all api routes-------------
app.get("/api/v1/products", async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json({
      status: "success",
      message: "Get all data successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      data: {},
    });
  }
});

app.get("/api/v1/product", async (req, res) => {
  try {
    const result = await Product.find({ _id: "653f863ad1f880080cb8fa46" });
    // const result = await Product.findById("653f863ad1f880080cb8fa46");

    res.status(200).json({
      status: "success",
      message: "Successfully data found",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data not found",
      data: {},
    });
  }
});

app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = new Product(req.body);

    const result = await product.save();

    // product.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      data: {},
    });
  }
});

module.exports = app;
