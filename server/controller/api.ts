import {requestParams} from 'server/decorator/express';

export class ApiController {
  private value = 123;

  public validateGetValue() {
    return (params: requestParams): requestParams => {
      if (params['test']) {
        throw 'test: tests are not allowed!';
      }
      params['test'] = false;
      return params;
    }
  }

  public handleGetValue() {
    return (params: requestParams) => {
      return {
        value: this.value,
        test: params.test,
      };
    }
  }
}
