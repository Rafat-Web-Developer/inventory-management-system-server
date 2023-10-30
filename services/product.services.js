const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find();
  return products;
};

exports.getProductService = async () => {
  const product = await Product.find({ _id: "653f863ad1f880080cb8fa46" });
  // const product = await Product.findById("653f863ad1f880080cb8fa46");
  return product;
};

exports.createProductService = async (data) => {
  const product = new Product(data);
  const result = await product.save();
  // product.logger();
  return result;
};
