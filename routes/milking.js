const express = require('express');
const router = express.Router();
const Milking = require('../models/Milking.js');

router.delete('/:id', async (req, res) => {
    try {
        const milkingRemoved = await Milking.deleteOne({_id: req.params.id})
        res.json(milkingRemoved);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const milking = await Milking.find().sort({createdAt: -1}).limit(10);
        res.json(milking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const milking = await Milking.findById(req.params.id);
        if (!milking) return res.status(404).send('Milking not found.');
        res.json(milking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const milking = new Milking();
        const milkingSaved = await milking.save();
        res.json(milkingSaved);    
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;
