const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');

const PORT = proces.env.port || 3001;

const app = express();

app.use(express.json());
// haven't been able to find clear difference or importance of true/false here
app.use(express.urlencoded({ extended: true }));
// sets the web extension '/api' to link to index.js
app.use('/api', api);
// serves files that are not being generated each time - helps performance
app.use(express.static('public'));
// sets route for the homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// sends user to the notes.html page when /notes ends the url
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// when the app is being successfully hosted: prints to console log
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);