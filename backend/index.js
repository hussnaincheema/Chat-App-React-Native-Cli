const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 4000;

// Utility: Generate unique message IDs
function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

// In-memory chat group storage
let chatGroups = [];

app.use(express.json());
app.use(cors());

io.on('connection', socket => {
  console.log(`${socket.id} connected`);

  // Join a specific chat group room
  socket.on('joinGroup', groupId => {
    socket.join(groupId.toString());
    console.log(`Socket ${socket.id} joined group ${groupId}`);
  });

  // Get all group data
  socket.on('getAllGroups', () => {
    socket.emit('groupList', chatGroups);
  });

  // Create a new group
  socket.on('createGroup', groupName => {
    const newGroup = {
      id: chatGroups.length + 1,
      groupName,
      messages: [],
    };
    chatGroups.push(newGroup);
    io.emit('groupList', chatGroups);
  });

  // Find a group and send its messages
  socket.on('findGroup', id => {
    const filteredGroup = chatGroups.filter(item => item.id === id);
    socket.emit('foundGroup', filteredGroup[0]?.messages || []);
  });

  // Handle sending a new message to a group
  socket.on('newChatMessage', data => {
    const {currentChatMessage, groupIdentifier, currentUser, timeData} = data;

    const filteredGroup = chatGroups.filter(
      item => item.id === groupIdentifier,
    );

    if (filteredGroup.length > 0) {
      const newMessage = {
        id: createUniqueId(),
        text: currentChatMessage,
        currentUser,
        time: `${timeData.hr}:${timeData.mins}`,
      };

      // Broadcast to all sockets in the group room (except sender)
      socket.to(groupIdentifier.toString()).emit('groupMessage', newMessage);

      // Add to group's message history
      filteredGroup[0].messages.push(newMessage);

      // Optionally send updated group messages back to sender
      socket.emit('foundGroup', filteredGroup[0].messages);
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
