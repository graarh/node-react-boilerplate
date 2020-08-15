import {default as pino} from 'pino';
import {setLogger} from 'src/logger';

setLogger(pino({
  level: 'debug',
  prettyPrint: {
    ignore: 'hostname,pid',
    translateTime: 'HH:MM:ss l'
  }
}));