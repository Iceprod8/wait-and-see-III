const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 25565;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "https://wait-and-see-3.vercel.app", // Remplacez par l'URL de votre application frontend
        methods: ["GET", "POST"]
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/favicon.ico'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('return_card', index => {
        io.emit('return_card', index);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Autres gestionnaires d'événements Socket.IO ici
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
