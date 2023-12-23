////////////LISTS API//////////////////////////////////////
const express = require('express');
const router = express.Router();

const list = require('../database/models/list');
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
        const lists = await list.findAll();
        res.status(200).json(lists);
    }catch (error){
        handleErrorResponse(res,error,"Error retrieving lists");
    }
});

router.get('/:id', async (req, res) => {
    const listId = req.params.id;
    try {
        const List = await list.findByPk(listId);
        if (!List) {
            return res.status(404).json({ success: false, message: 'List not found.'});
        }
        return res.status(200).json(List);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving list');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, owner } = req.body;
        const List = await list.create({
            name, description, owner
        });
        res.status(201).json(List);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating list');
    }
});

router.put('/:id', async (req, res) => {
    const listId = req.params.id;
    const updatedData = req.body;
    try {
        const List = await list.findByPk(listId);
        if (!List) {
            return res.status(404).json({ success: false, message: 'List not found.' });
        }
        await List.update(updatedData);
        return res.status(200).json({ 
            success: true, message: 'List updated successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating list');
    }
});

router.delete('/:id', async (req, res) => {
    const listId = req.params.id;
    try {
        const List = await list.findByPk(listId);
        if (!List) {
            return res.status(404).json({ success: false, message: 'List not found.' });
        }
        await List.destroy();
        await movie.destroy({
            where:{
                ListId: null
            }
        });
        return res.status(200).json({ 
            success: true, message: 'List deleted successfully.' 
        });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting list');
    }
});

module.exports = router;