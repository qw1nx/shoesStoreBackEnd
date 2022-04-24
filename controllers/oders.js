const router = require('express').Router();
const orderService = require('../services/orders');
const { isAuth, isAdmin } = require('../middlewares/guards');



const api = require("../services/shoes");
const {isAuth} = require("../middlewares/guards");
const mapErrors = require("../utils/mapper");

router.get('/', isAdmin(), async (req, res) => {
    console.log(req.user);
    const data = await orderService.getAll();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
        productsOrdered: req.user.productsOrdered
    };

    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});