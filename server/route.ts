import {Router} from 'express';
import express from 'express';
import {RootController} from 'server/controller/root';
import {ApiController} from 'server/controller/api';

const rootController = new RootController();
const apiController = new ApiController();

export const router = Router();

const templates = Router();
templates.use(express.urlencoded({extended: true}));
rootController.setupRoutes(templates);
router.use('/', templates);

const api = Router();
api.use(express.json());
apiController.setupRoutes(api);
router.use('/api', api);