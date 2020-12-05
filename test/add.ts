import './logger';
import {log} from "src/logger";
import {describe, it} from 'mocha';
import {expect} from 'chai';
import {add} from 'src/logic/add';

describe('some functions test', function () {
  log.info('test');

  describe('add', function () {

    it('should work with positive numbers', function () {
      expect(add(1, 2)).to.equal(3);
      expect(add(0, 1)).to.equal(1);
    });

    it('should work with negative numbers', function () {
      expect(add(0, -1)).to.equal(-1);
      expect(add(3, -2)).to.equal(1);
    });
  });
});