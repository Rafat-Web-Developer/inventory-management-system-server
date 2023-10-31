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

exports.updateProductService = async (productId, data) => {
  // ------System 01--------
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  // -----System 02-------
  // const result = await Product.updateOne({ _id: productId }, data, {
  //   runValidators: true,
  // });

  // -----System 03-------
  // const result = await Product.findOneAndUpdate({ _id: productId }, data, {
  //   new: true,
  //   runValidators: true,
  // });
  return result;
};
