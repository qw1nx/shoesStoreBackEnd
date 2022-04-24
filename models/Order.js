const { model, Schema, Types:{ObjectId}} = require('mongoose');

const userSchema = new Schema ({
    firstName: { type: String, required: [true, 'First name is required']},
    lastName: { type: String, required: [true, 'Last name is required']},
    phone: {type: String, required: [true, 'Phone number is required']},
    email: {type: String, required: [true, 'Email is required']},
    city: {type: String, required: [true, 'City is required']},
    street: {type: String, required: [true, 'Street is required']},
    streetNumber: {type: String, required: [true, 'Street number is required']},
    productsOrdered: {type: [ObjectId], required: [true, 'You can\'t order nothing']}

})


const Order = model('Order', userSchema);

module.exports = Order;