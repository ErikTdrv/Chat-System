const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
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
const activeUsers = new Map();
io.on('connection', (socket) => {
  console.log('A user connected');
  activeUsers.set(socket.id, socket.cookie);

  const sender = Array.from(activeUsers.keys())[0];
  socket.on('privateMessage', ({content}) => {
    console.log('Received private message:', content);  
    // io.to(socket.id).emit('privateMessage', {from: socket.id, content})
    io.to(sender).emit('privateMessage', {from: socket.id, content});
  });
  socket.on('disconnect', () => {
    console.log(socket.cookie)
    const cookie = socket.cookie;
    if (cookie) {
      console.log('User disconnected:', cookie);
      activeUsers.delete(socket.id); // Remove the user from the map
      delete socket.cookie;
    }
  })
})

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   // Example event: 'chat message'
//   socket.on('chat message', (message) => {
//     console.log('Received message:', message);
//     console.log(socket.id)
//     const users = [];
//     for (let [id, socket] of io.of("/").sockets) {
//       users.push({
//         userID: id,
//         cookie: socket.cookie,
//       });

//     }
//     socket.emit("users", users);
//     // Broadcast the message to all connected clients
//     io.emit('chat message', message);
//   });
//   socket.on("private message", ({ content }) => {
//     console.log(content, socket.id);
//     const recipientSocket = io.sockets.sockets.get(socket.id);
//     if (recipientSocket) {
//       recipientSocket.emit("private message", {
//         content,
//         from: socket.id,
//       });
//     } else {
//       console.log("Recipient socket not found");
//     }
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});