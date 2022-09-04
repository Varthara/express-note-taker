// Express
const express = require('express');
const path = require('path');
const app = express();
// Port for Server
const PORT = process.env.PORT || 3000;
// File routing variable
const API = require('./routes/noteRoutes');
const randID = require('./routes/randID');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/notes', API);




app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Confirmation server is functioning
app.listen(PORT, () => 
    console.log(`Server is now running on http://localhost:${PORT} `)
);