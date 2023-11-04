const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find();
  return products;
};

exports.getProductService = async (productId) => {
  const product = await Product.find({ _id: productId });
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

exports.bulkUpdateProductsService = async (data) => {
  // ------Update simller data for all ids-----
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  // ------Update difference data for all ids------
  const allPromise = [];

  data.products.forEach((product) => {
    allPromise.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = Promise.all(allPromise);
  return result;
};

exports.deleteProductService = async (productID) => {
  const result = await Product.deleteOne({ _id: productID });
  return result;
};

exports.bulkDeleteProductsService = async (productIDs) => {
  const result = await Product.deleteMany({ _id: productIDs });
  return result;
};

exports.deleteAllProductsService = async () => {
  const result = await Product.deleteMany({});
  return result;
};
