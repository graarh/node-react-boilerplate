import {default as pino} from 'pino';
import {setLogger} from 'server/logger';

setLogger(pino({
  level: 'debug',
  prettyPrint: {
    ignore: 'hostname,pid',
    translateTime: 'HH:MM:ss l'
  }
}));