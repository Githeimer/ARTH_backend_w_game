import {Router as router} from 'express'
import {playerinfo} from '../controllers/playerController.js';
const Router=router();


Router.patch('/info',playerinfo)

export default Router;