import 'regenerator-runtime/runtime';
import {log} from 'server/logger';
import express from 'express';
import cors from 'cors';
import expressPinoLogger from 'express-pino-logger';
import mustache from 'mustache-express';
import {router} from 'server/route';
import {handleMessages} from "server/socket/messages";

const app = express();
const http = require('http').createServer(app);

const socketCors = process.env.NODE_ENV === "development" ? {cors: {origin: true}} : {};
const socket = require('socket.io')(http, socketCors);

app.engine('html', mustache('', 'html', ['@{', '}@']));
app.set('view engine', 'html');
app.set('views', [__dirname + '/../template', __dirname + '/../build']);
app.set('x-powered-by', false);
app.use(expressPinoLogger({logger: log}));

process.env.NODE_ENV === "development" && app.use(cors());

app.use(router);
app.use(express.static(__dirname + '/../build'));

socket.on('connection', handleMessages());

(async () => {
  const port = process.env.PORT || 80;

  log.info('started');
  log.info(`listening on port ${port}...`)
  const server = http.listen(port);

  function gracefulShutdown() {
    log.warn('SIGTERM caught, exiting...');
    server.close();
  }

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
})();
