import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { 
        origin: "http://localhost:5173", // change
        methods: ["GET", "POST"] 
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});