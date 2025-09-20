const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
    try {
        const {title, description, price} = req.body
        const product = new Product({
            title, description, price, creator: req.user.userId
        })
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('creator', 'name')
        res.json(products)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}