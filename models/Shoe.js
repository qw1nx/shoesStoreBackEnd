const { model, Schema } = require('mongoose');

const shoeSchema = new Schema ({
    maker: {type: String, required: [true, 'Maker is required']},
    model: {type: String, required: [true, 'Model is required']},
    gender: {type: String, required: [true, 'Gender is required']},
    imageUrl: {type: String, required: [true, 'Image is required']},
    price: {type: Number, required: [true, 'Price is required']},
    description: {type: String, required: [true, 'Description is required']},
    sizesAvailable: {type: [String], required:[true, 'Available shoe sizes required']}
})
//pplWhishlisted: {type: [ObjectId], default: []

const Shoe = model('Shoe', shoeSchema);

module.exports = Shoe;