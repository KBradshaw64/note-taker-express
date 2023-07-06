const router = require('express').Router();
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// reads db file to send info as json
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    readAndDelete(id, './db/db.json');
    // sends response - only visible in insomnia etc.
    res.json('Successfully Deleted');
})

module.exports = router;