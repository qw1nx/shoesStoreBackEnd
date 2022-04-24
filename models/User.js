const { model, Schema, Types: {ObjectId}} = require('mongoose');

const userSchema = new Schema ({
    email: { type: String, required: [true, 'Email is required'] },
    hashedPassword: { type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    orders: {type: [ObjectId], default: []},
    whishlist: {type: [ObjectId], default: []}
})


userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;