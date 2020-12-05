import 'regenerator-runtime/runtime';
import {log} from 'src/logger';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import {setupRoutes} from 'src/route';

export const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../template');
app.set('x-powered-by', false);
app.use(expressPinoLogger({logger: log}));
app.use(express.static(__dirname + '/../public'));

setupRoutes(app);

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
