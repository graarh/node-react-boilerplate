import {Router} from 'express';
import {each} from 'lodash';
import {handleAsAPI, handleAsTemplate} from "server/lib/express";

interface handler {
  method: string;
  name: string;
  path: string;
  validator: string | undefined;
}

abstract class Controller {
  handlers: handler[] = [];

  setupRoutesUsingDecorator(router: Router, decoratorFunc: Function) {
    const handlers = Object.getPrototypeOf(this).handlers;
    each(handlers, handler => {
      const handleFunc = decoratorFunc({
        handler: this[handler.name](),
        validator: handler.validator && this[handler.validator](),
      });
      switch (handler.method) {
        case 'get':
          router.get(handler.path, handleFunc);
          break;
        case 'post':
          router.post(handler.path, handleFunc);
          break;
        case 'put':
          router.put(handler.path, handleFunc);
          break;
        case 'delete':
          router.delete(handler.path, handleFunc);
          break;
        case 'all':
          router.all(handler.path, handleFunc);
          break;
        default:
          // eslint-disable-next-line no-throw-literal
          throw new ControllerError('unknown http method');
      }
    });
  }
}

export class ControllerError extends Error {
}

export class APIController extends Controller {
  public setupRoutes(router: Router) {
    this.setupRoutesUsingDecorator(router, handleAsAPI);
  }
}

export class TemplateController extends Controller {
  public setupRoutes(router: Router) {
    this.setupRoutesUsingDecorator(router, handleAsTemplate);
  }
}

export function Handler(path: string, method: string, validator?: string) {
  return function (target: any, propertyKey: string, _: PropertyDescriptor) {
    if (!(target instanceof Controller)) {
      throw new ControllerError('Handler decorator should be used only on Controller classes');
    }
    if (path[0] !== '/') {
      throw new ControllerError('URL path of handler should be started from /');
    }
    target.handlers = target.handlers || [];
    target.handlers.push({
      method: method,
      name: propertyKey,
      path: path,
      validator: validator,
    });
  }
}