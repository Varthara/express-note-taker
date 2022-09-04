const fs = require('fs');
const express = require('express');
const router = express.Router();
const randID = require('./randID');




// GET route for new note
router.get('/',(req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// POST route for new note
router.post('/', (req,res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: randID()
    }
fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if(err) {
        throw err;
    } else {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(
            './db/db.json',
            JSON.stringify(notes, null, 4),
            (err, data) => {
                if(err) {
                    throw err;
                }
                res.json({data: req.body, message: "success!"});
            }
        );
    }
});
});