const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema( {
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)