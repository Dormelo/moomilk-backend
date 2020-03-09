const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Milking = require('../models/Milking.js');

router.delete('/:id', auth, async (req, res) => {
    try {
        const milkingRemoved = await Milking.deleteOne({_id: req.params.id})
        res.json(milkingRemoved);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const milking = await Milking.find().sort({createdAt: -1}).limit(10);
        res.json(milking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const milking = await Milking.findById(req.params.id);
        if (!milking) return res.status(404).send('Milking not found.');
        res.json(milking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const milking = new Milking();
        const milkingSaved = await milking.save();
        res.json(milkingSaved);    
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;
