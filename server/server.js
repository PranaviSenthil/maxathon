const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { clear } = require('console');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Handle player movement
    socket.on('playerMove', (data) => {
        io.emit('updatePosition', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
