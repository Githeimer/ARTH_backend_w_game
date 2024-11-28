import {Router as router} from 'express'
import {codeUpdate} from '../controllers/playerController.js';
const Router=router();

Router.patch('/update',codeUpdate);

export default Router;
