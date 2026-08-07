import {Router} from 'express'
import { userController, Login_controller } from '../controllers/userController.js'


const routeUser = Router()

routeUser.post('/register', userController)
routeUser.post('/login', Login_controller)

export default routeUser