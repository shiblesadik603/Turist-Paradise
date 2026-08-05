/** Socket.io setup — real-time blog reaction/comment updates, scoped per-blog via rooms. */
const { Server } = require("socket.io");
const env = require("./config/env");

let io = null;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: env.frontendUrl },
  });

  io.on("connection", (socket) => {
    socket.on("blog:join", (blogId) => {
      if (typeof blogId === "string") {
        socket.join(`blog:${blogId}`);
      }
    });

    socket.on("blog:leave", (blogId) => {
      if (typeof blogId === "string") {
        socket.leave(`blog:${blogId}`);
      }
    });
  });

  return io;
};

/** Emits an update to everyone currently viewing this blog post. No-op if socket.io hasn't been initialized (e.g. in scripts that import the app without starting the server). */
const emitBlogUpdate = (blogId, blog) => {
  io?.to(`blog:${blogId}`).emit("blog:updated", blog);
};

module.exports = { initSocket, emitBlogUpdate };
