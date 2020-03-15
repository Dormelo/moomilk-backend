const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const CowMilking = require('../models/CowMilking.js');
const Milking = require('../models/Milking.js');
const Cow = require('../models/Cow.js');

router.delete('/:id', auth, async (req, res) => {
    try {
        const cowMilkingRemoved = await CowMilking.deleteOne({_id: req.params.id})
        res.json(cowMilkingRemoved);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const cowMilking = await CowMilking.find();
        res.json(cowMilking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const cowMilking = await CowMilking.findById(req.params.id);
        if (!cowMilking) return res.status(404).send('CowsMilking not found.');
        res.json(cowMilking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', auth,  async (req, res) => {
    try {
        const milking = await Milking.findById(req.body.milkingId);
        if (!milking) return res.status(404).send('Milking not found.');

        const cow = await Cow.findById(req.body.cowId);
        if (!cow) return res.status(404).send('Cows not found.');

        const cowMilking = new CowMilking({
            cowId: req.body.cowId,
            milkingId: req.body.milkingId,
            litre: req.body.litre
        });
        const cowMilkingSaved = await cowMilking.save();
        res.json(cowMilkingSaved);    
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const cowMilkingUpdated = await CowMilking.updateOne(
            {_id: req.params.id},
            {$set: {
                litre: req.body.litre
            }},
            {
                runValidators: true
            }
        );
        res.json(cowMilkingUpdated);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;