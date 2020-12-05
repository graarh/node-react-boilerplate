import {Express, Router} from 'express';
import express from 'express';
import {RootController} from 'src/controller/root';
import {ApiController} from 'src/controller/api';
import {handleAsAPI, handleAsTemplate} from 'src/decorator/express';

const rootController = new RootController();
const apiController = new ApiController();

export function setupRoutes(app: Express) {
  const templates = Router();
  templates.use(express.urlencoded({extended: true}));
  templates.get('/', handleAsTemplate({
    handler: rootController.handleTemplate()
  }));
  app.use('/', templates);

  const api = Router();
  api.use(express.json());
  api.get('/getValue', handleAsAPI({
    handler: apiController.handleGetValue(),
    validator: apiController.validateGetValue(),
  }));
  app.use('/api', api);
}