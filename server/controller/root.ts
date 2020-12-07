import {templateRequestParams, templateResponseParams} from 'server/decorator/express';

export class RootController {
  private value = 123;

  public handleReactApp() {
    return (_: templateRequestParams): templateResponseParams => {
      return {
        template: 'index',
        data: {preload: JSON.stringify({data: {value: this.value}})},
      };
    }
  }

  public handleTemplate() {
    return (_: templateRequestParams): templateResponseParams => {
      return {
        template: 'template',
        data: {value: this.value}
      };
    }
  }
}