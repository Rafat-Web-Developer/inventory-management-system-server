const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router
  .route("/bulk-update")
  .patch(productController.bulkUpdateProductsController);

router
  .route("/bulk-delete")
  .delete(productController.bulkDeleteProductsController);

router
  .route("/delete-all")
  .delete(productController.deleteAllProductsController);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProductController)
  .delete(productController.deleteProductController);

module.exports = router;
