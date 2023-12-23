/////////////FAVORITES API/////////////////////////////////
const express = require('express');
const router = express.Router();

const favorite = require('../database/models/favorite');

const handleErrorResponse = (res, error, message) => {
    console.error(`Error: ${message}`
    , error);
    return res.status(500).json({ 
        success: false, message: `Error ${message}.`
    });
};

router.get('/', async (req, res) => {
    try{
        const Favorites = await favorite.findAll();
        res.status(200).json(Favorites);
    }catch (error){
        handleErrorResponse(res,error,"Error retrieving favorites");
    }
});

router.post('/', async (req, res) => {
    try {
        const { MovieId, ListId } = req.body;
        const Favorite = await favorite.create({
            MovieId, ListId
        });
        res.status(201).json(Favorite);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating favorite');
    }
});

router.get('/:id', async (req, res) => {
    const favoriteId = req.params.id;
    try {
        const Favorite = await favorite.findByPk(favoriteId);
        if (!Favorite) {
            return res.status(404).json({ success: false, message: 'Favorite not found.'});
        }
        return res.status(200).json(Favorite);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving favorite');
    }
});

router.put('/:id', async (req, res) => {
    const favoriteId = req.params.id;
    const updatedData = req.body;
    try {
        const Favorite = await favorite.findByPk(favoriteId);
        if (!Favorite) {
            return res.status(404).json({ success: false, message: 'Favorite not found.' });
        }
        await Favorite.update(updatedData);
        return res.status(200).json({ 
            success: true, message: 'Favorite updated successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating favorite');
    }
});

router.delete('/:id', async (req, res) => {
    const favoriteId = req.params.id;
    try {
        const Favorite = await favorite.findByPk(favoriteId);
        if (!Favorite) {
            return res.status(404).json({ success: false, message: 'Favorite not found.' });
        }
        await Favorite.destroy();
        return res.status(200).json({ 
            success: true, message: 'Favorit deleted successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting favorite');
    }
});

module.exports = router;
