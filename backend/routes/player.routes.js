import {Router as router} from 'express'
import {playerinfo} from '../controllers/scoreController.js';
const Router=router();


Router.patch('/info',playerinfo)

export default Router;