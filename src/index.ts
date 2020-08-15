import {log} from 'src/logger';
import {add} from 'src/some/add';
import {positive} from "src/some/positive";

log.debug('Started');

log.info(`Calculating 3+5: ${add(3, 5)}`);

log.warn(`Checking positive: ${positive(6)}`);