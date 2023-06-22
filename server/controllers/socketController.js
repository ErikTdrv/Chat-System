const socketLogic = (io) => {
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
}
module.exports = socketLogic;