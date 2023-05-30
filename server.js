import app from "./src/07_app.js";
import cluster from "node:cluster";
import { cpus } from "node:os";
import http from "node:http";
import { Server as WebSocketServer } from "socket.io";
import process from "node:process";
import { logger } from "./src/12_utils/index.js";
import sockets from "./src/08_sockets.js";
import messagesService from "./src/01_business/messagesService.js";
if (process.env.PERSISTENCE_SYSTEM === "mongo") import("./src/13_config/db.js");

const server = http.createServer(app);
const io = new WebSocketServer(server);

const enableExpress = () => {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    logger.info(
      `🚀 Server ${process.pid} running on http://localhost:${PORT}...`
    );
    io.on("connection", async function (socket) {
      logger.info(`${socket.id} connected.`);

      io.emit("messages", await messagesService.getMessages());
    });
  });
};

const enableCluster = () => {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    logger.info(`Master ${process.pid} is running.`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      logger.info(`${worker.process.pid} is finished.`);
      cluster.fork();
    });
  } else {
    enableExpress();
  }
};

const CLUSTER = false;

if (CLUSTER) {
  enableCluster();
} else {
  enableExpress();
}
