const productServices = require("../services/product.services");

/**
 * @Controllers
 * getProducts => Gets all products from product model
 * getProduct => Get a single product from product model
 * createProduct => Create a single product in product model
 * @version 1.0.0
 * ...
 */
exports.getProducts = async (req, res) => {
  try {
    let filters = { ...req.query };
    let excludingItems = ["sort", "limit", "select"];
    excludingItems.forEach((excludingItem) => delete filters[excludingItem]);

    filters = JSON.parse(
      JSON.stringify(filters).replace(
        /\bgt|lt|gte|lte\b/g,
        (match) => `$${match}`
      )
    );

    let queries = {};
    if (req.query?.sort) {
      queries.sort = req.query?.sort.split(",").join(" ");
    }
    if (req.query?.select) {
      queries.select = req.query?.select.split(",").join(" ");
    }
    if (req.query?.limit) {
      queries.limit = req.query?.limit;
    }

    const result = await productServices.getProductsService(filters, queries);

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
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productServices.getProductService(id);

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
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await productServices.createProductService(req.body);

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
};

exports.updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productServices.updateProductService(id, req.body);

    res.status(200).json({
      ststus: "success",
      message: "Data Updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.bulkUpdateProductsController = async (req, res) => {
  try {
    const result = await productServices.bulkUpdateProductsService(req.body);

    res.status(200).json({
      ststus: "success",
      message: "Data Updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productServices.deleteProductService(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        message: "Can't delete product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.bulkDeleteProductsController = async (req, res) => {
  try {
    const result = await productServices.bulkDeleteProductsService(req.body);
    res.status(200).json({
      status: "success",
      message: "Products deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.deleteAllProductsController = async (req, res) => {
  try {
    const result = await productServices.deleteAllProductsService();
    res.status(200).json({
      status: "success",
      message: "Products deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
