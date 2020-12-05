import {Express} from 'express';
import {RootController} from 'src/controller/root';

const rootController = new RootController();

export function setupRoutes(app: Express) {
  app.get('/', rootController.handleTemplate());
}