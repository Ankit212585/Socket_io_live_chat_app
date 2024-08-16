const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

// Serve static files
app.use(express.static(path.resolve("./public")));

// Route for serving the index.html
app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

// Start the server on port 9001
server.listen(9001, (err) => {
  if (!err) {
    console.log("Server is running on port 9001");
  } else {
    console.log(err);
  }
});
