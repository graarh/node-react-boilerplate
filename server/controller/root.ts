import {templateRequestParams, templateResponseParams} from 'server/decorator/express';

export class RootController {
  private value = 123;

  public handleTemplate() {
    return (_: templateRequestParams): templateResponseParams => {
      return {
        template: 'template',
        data: {data: {value: this.value}}
      };
    }
  }
}