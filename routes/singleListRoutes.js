////////////LISTS API//////////////////////////////////////
const express = require('express');
const router = express.Router();

const list = require('../database/models/list');
const favorite = require('../database/models/favorite');
const movie = require('../database/models/movie');

const handleErrorResponse = (res, error, message) => {
    console.error(`Error: ${message}`
    , error);
    return res.status(500).json({ 
        success: false, message: `Error ${message}.`
    });
};

router.get('/:id', async (req, res) => {
    const listId = req.params.id;
    try {

        const List = await list.findByPk(listId);
        if(!List) {
            return res.status(404).json({ success: false, message: 'List not found.'});
        }

        const Favorite = await favorite.findAll({
            where: {
                ListId: listId
            }
        });
        if(!Favorite){
            return res.status(404).json({ success: false, message: 'List contents not found.'});
        }
        
        const movieIds = Favorite.map((movie) => {
            return movie.MovieId
        })

        const Movies = await movie.findAll({
            where: {
                id: movieIds
            }
        });
        if(!Movies){
            return res.status(404).json({ success: false, message: 'Movie details not found.'});
        }

        console.log(Movies);

        var content=[List, Movies];
        return res.status(200).json(content);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving list');
    }
});

router.get('/:id/addmovie', async (req, res) => {
    const listId = req.params.id;
    try {
        const List = await list.findByPk(listId);
        if(!List) {
            return res.status(404).json({ success: false, message: 'List not found.'});
        }
        return res.status(200).json(content);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving list');
    }
});

module.exports = router;