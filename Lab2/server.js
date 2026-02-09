const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello to Socket.IO Server');
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const serverIO = require('socket.io')(server);

serverIO.on('connection', (socket) => {
    console.log(`A new user connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the message to all clients
        serverIO.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});