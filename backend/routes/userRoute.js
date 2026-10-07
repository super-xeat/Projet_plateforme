import {Router} from 'express'
import { userController, 
    Login_controller, 
    User_all_controller,
    update_user_controller,
    obtenir_user_controller,
    Logout
 } from '../controllers/userController.js'
import { Authentificate, Autorisation } from "../middleware/verif_token.js";


const routeUser = Router()

routeUser.post('/register', userController)
routeUser.post('/login', Login_controller)
routeUser.get('/obtenir_users', Authentificate, Autorisation, User_all_controller)
routeUser.patch('/update_profil/:id_user', Authentificate, update_user_controller)
routeUser.get('/obtenir_user/:id_user', Authentificate, obtenir_user_controller)
routeUser.post('/logout', Logout)

export default routeUser