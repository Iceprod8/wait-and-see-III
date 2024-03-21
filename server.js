const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    nextHandler(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("return_card", index => {
        io.emit("return_card", index);
    });
      
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Autres gestionnaires d"événements Socket.IO ici
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
