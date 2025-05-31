const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST'],
  },
});

const PORT = 4000;

let chatGroups = [];

app.use(express.json());
app.use(cors());

io.on('connection', socket => {
  console.log(`${socket.id} connected`);

  socket.on('getAllGroups', () => {
    socket.emit('groupList', chatGroups);
  });

  socket.on('createGroup', groupName => {
    const newGroup = {
      id: chatGroups.length + 1,
      name: groupName,
      messages: [],
    };
    chatGroups.push(newGroup);
    io.emit('groupList', chatGroups);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
