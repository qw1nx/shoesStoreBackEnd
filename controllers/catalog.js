const router = require('express').Router();
const api = require('../services/shoes');
const { isAuth, isOwner, isAdmin} = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');


router.get('/', async (req, res) => {
    console.log(req.user);
    const data = await api.getAll();
    res.json(data);
});


//mahnat e isAuth() ot post zaqvkata need to add it later

router.post('/', isAuth(), isAdmin(), async (req, res) => {
    const item = {
        maker: req.body.maker,
        model: req.body.model,
        gender: req.body.gender,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        sizesAvailable: req.body.sizesAvailable
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
/////////////////////////////////////////////////////////////////////////
router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isAuth, isAdmin(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        maker: req.body.maker,
        model: req.body.model,
        gender: req.body.gender,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        sizesAvailable: req.body.sizesAvailable
    };

    try {
        const result = await api.update(itemId, item);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isAuth(),isAdmin(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

module.exports = router;