import {Router} from 'express';
import express from 'express';
import {RootController} from 'server/controller/root';
import {ApiController} from 'server/controller/api';
import {handleAsAPI, handleAsTemplate} from 'server/decorator/express';

const rootController = new RootController();
const apiController = new ApiController();

export const router = Router();

const templates = Router();
templates.use(express.urlencoded({extended: true}));
templates.get('/', handleAsTemplate({
  handler: rootController.handleTemplate()
}));
router.use('/', templates);

const api = Router();
api.use(express.json());
api.get('/getValue', handleAsAPI({
  handler: apiController.handleGetValue(),
  validator: apiController.validateGetValue(),
}));
router.use('/api', api);