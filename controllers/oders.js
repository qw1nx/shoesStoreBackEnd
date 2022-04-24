const router = require('express').Router();
const orderService = require('../services/orders');
const { isAuth, isAdmin } = require('../middlewares/guards');



const api = require("../services/shoes");
const {isAuth} = require("../middlewares/guards");
const mapErrors = require("../utils/mapper");

router.get('/',isAuth() , isAdmin(), async (req, res) => {
    console.log(req.user);
    const data = await orderService.getAll();
    res.json(data);
});

router.get('/myOrders', isAuth(), async(req, res) => {
    const myOrders = await orderService.getAllByUserId(req.user._id);
    res.json(myOrders);
})

router.post('/', isAuth(), async (req, res) => {
    const item = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
        productsOrdered: req.body.productsOrdered,
        userId: req.user._id

    };

    try {
        const result = await orderService.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});