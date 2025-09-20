const productController = require("../controllers/productController")
const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth")

// Only logged in Users can create Products
router.post("/", auth, productController.createProduct)


// Public Route, anyone can view the products
router.get("/", productController.getAllProducts)

module.exports = router