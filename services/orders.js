const Item = require('../models/Order');


async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}



async function getAll() {
    return Item.find({});
}

async function getAllByUserId(userId){
    return Item.find({userId: userId})
}

module.exports = {
    getAll,
    create,
    getAllByUserId
};