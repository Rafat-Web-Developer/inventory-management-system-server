const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connect successfully");
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
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

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
