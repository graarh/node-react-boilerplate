import {default as pino} from 'pino';

export let log = pino({
  level: 'info'
});

export function setLogger(logger) {
  log = logger;
}