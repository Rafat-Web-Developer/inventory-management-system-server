const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/singleProduct").get(productController.getProduct);
router
  .route("/bulk-update")
  .patch(productController.bulkUpdateProductsController);
router.route("/:id").patch(productController.updateProductController);

module.exports = router;
