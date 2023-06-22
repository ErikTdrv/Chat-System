const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const socketLogic = require('./controllers/socketController');

const io = socketIO(server, {
  cors: {
    origin: "localhost:3001",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});
const cors = require('cors');
app.options('*', cors()); // Enable OPTIONS for all routes
app.use(cors());

io.use((socket, next) => {
  const cookie = socket.handshake.auth.cookie;
  if (!cookie) {
    return next(new Error("invalid id"));
  }
  socket.cookie = cookie;
  next();
});
socketLogic(io);



server.listen(3001, () => {
  console.log('Server listening on port 3001');
});