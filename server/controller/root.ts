import {templateRequestParams, templateResponseParams} from 'server/lib/express';
import {TemplateController, Handler} from "../lib/controller";

export class RootController extends TemplateController{
  private value = 123;

  @Handler('/index.html', 'get')
  public handleReactApp() {
    return (_: templateRequestParams): templateResponseParams => {
      return {
        template: 'index',
        data: {preload: JSON.stringify({data: {value: this.value}})},
      };
    }
  }

  @Handler('/', 'get')
  public handleTemplate() {
    return (_: templateRequestParams): templateResponseParams => {
      return {
        template: 'template',
        data: {value: this.value}
      };
    }
  }
}