import 'regenerator-runtime/runtime';
import {log} from 'server/logger';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import mustache from 'mustache-express';
import {router} from 'server/route';

export const app = express();

app.engine('html', mustache('', 'html', ['@{', '}@']));
app.set('view engine', 'html');
app.set('views', [__dirname + '/../template', __dirname + '/../build']);
app.set('x-powered-by', false);
app.use(expressPinoLogger({logger: log}));

app.use(router);
app.use(express.static(__dirname + '/../build'));

(async () => {
  const port = process.env.PORT || 80;

  log.info('started');
  log.info(`listening on port ${port}...`)
  const server = app.listen(port);

  function gracefulShutdown() {
    log.warn('SIGTERM caught, exiting...');
    server.close();
  }

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
})();
