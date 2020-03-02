const express = require('express');
const router = express.Router();
const Cow = require('../models/Cow.js');

router.delete('/:travailId', async (req, res) => {
    try {
        const cowRemoved = await Cow.deleteOne({travailId: req.params.travailId})
        res.json(cowRemoved);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const cows = await Cow.find();
        res.json(cows);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:travailId', async (req, res) => {
    try {
        const cow = await Cow.find({travailId: req.params.travailId});
        if (!cow) return res.status(404).send('Cows not found.');
        res.json(cow);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', async (req, res) => {

    try {
        const cow = new Cow({
            immatriculationId: req.body.immatriculationId,
            travailId: req.body.travailId,
            name: req.body.name,
            sexe: req.body.sexe,
            bornAt: req.body.bornAt,
            lactation: req.body.lactation,
            estPresente: req.body.estPresente,
            sante: req.body.sante
        });

        const cowSaved = await cow.save();
        res.json(cowSaved);    
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.put('/:travailId', async (req, res) => {
    try {
        const cowUpdated = await Cow.updateOne(
            {travailId: req.params.travailId},
            {$set: {
                name: req.body.name,
                sexe: req.body.sexe,
                bornAt: req.body.bornAt,
                lactationType: req.body.lactation,
                estPresente: req.body.estPresente,
                sante: req.body.sante
            }},
            {
                runValidators: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        res.json(cowUpdated);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;