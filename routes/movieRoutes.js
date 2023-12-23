////////////MOVIES API//////////////////////////////////////////
const express = require('express');
const router = express.Router();

const movie = require('../database/models/movie');

const handleErrorResponse = (res, error, message) => {
    console.error(`Error: ${message}`
    , error);
    return res.status(500).json({ 
        success: false, message: `Error ${message}.`
    });
};

router.get('/', async (req, res) => {
    try{
        const movies = await movie.findAll();
        res.status(200).json(movies);
    }catch (error){
        handleErrorResponse(res,error,"Error retrieving movies");
    }
});

router.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const Movie = await movie.findByPk(movieId);
        if (!Movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.'});
        }
        return res.status(200).json(Movie);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving movie');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, genre, releaseDate, rating, description, posterPath, backdropPath, ListId } = req.body;
        const Movie = await movie.create({
            title, genre, releaseDate, rating, description, posterPath, backdropPath, ListId
        });
        res.status(201).json(Movie);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating movie');
    }
});

router.put('/:id', async (req, res) => {
    const movieId = req.params.id;
    const updatedData = req.body;
    try {
        const Movie = await movie.findByPk(movieId);
        if (!Movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }
        await Movie.update(updatedData);
        return res.status(200).json({ 
            success: true, message: 'Movie updated successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating movie');
    }
});

router.delete('/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const Movie = await movie.findByPk(movieId);
        if (!Movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }
        await Movie.destroy(); 
        return res.status(200).json({ 
            success: true, message: 'Movie deleted successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting movie');
    }
});



module.exports = router;
