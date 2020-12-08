import {requestParams} from 'server/lib/express';
import {APIController, Handler} from "../lib/controller";

export class ApiController extends APIController{
  private value = 123;

  public validateGetValue() {
    return (params: requestParams): requestParams => {
      if (params['test']) {
        throw new Error('test: tests are not allowed!');
      }
      params['test'] = false;
      return params;
    }
  }

  @Handler('/getValue', 'get', 'validateGetValue')
  public handleGetValue() {
    return (params: requestParams) => {
      return {
        value: this.value,
        test: params.test,
      };
    }
  }

  @Handler('/getDefinedValue', 'get')
  public handleGetDefinedValue() {
    return (_: requestParams) => {
      return {
        value: 100,
        test: 'defined',
      };
    }
  }
}
