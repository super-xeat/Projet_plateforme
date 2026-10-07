
import { UserService_create, 
    Login_service, 
    User_all_service,
    update_user_service,
    obtenir_user_service
 } from "../services/userService.js";
import cookieParser from 'cookie-parser';


export const userController = async(req, res) => {

    try {
        const {nom, prenom, email, mot_de_passe, adresse, pseudo} = req.body
        console.log('req body :', req.body)

        if (!nom || !prenom || !email || !mot_de_passe || !adresse || !pseudo) {

            return res.status(500).json({'erreur': 'il manque des champs'})
        }
        const newuser = await UserService_create(nom, prenom, email, mot_de_passe, adresse, pseudo)

        return res.status(201).json({'message': 'user créer'})
        
    } catch (error) {
        console.log('erreur :', error)
        return res.status(500).json({'message': error})
    }
}

export const Login_controller = async(req, res) => {

    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({'message': 'champs manquant'})
        }
        const { user, token } = await Login_service(email, password)

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 3 * 60 * 60 * 1000 
        });

        const user_trouver = {
            'id': user.id_user,
            'pseudo': user.pseudo,
            'role': user.role,
            'email': user.email,
            'message': 'utilisateur trouvé avec succés'
        }
        console.log('user :', user_trouver)

        return res.status(200).json(user_trouver)

    } catch (error) {
        console.log('erreur :', error)
        return res.status(500).json({'message': error})
    }
}

export const Logout = async(req, res) => {

    try {
        res.clearCookie('token')
        
        return res.status(200).json({
            'message':'déconnexion réussi'
        })
    } catch (error) {
        return res.status(500).json({'erreur': 'erreur serveur'})
    }
}

export const User_all_controller = async(req, res) => {

    try {
        const users = await User_all_service()
        return res.status(200).json({
            'users': users
        })

    } catch (error) {
        return res.status(400).json({'message': 'erreur users dans le controller'})
    }
}

export const update_user_controller = async(req, res) => {

    try {
        const {id_user} = req.params
        const body = req.body
        const update_user = await update_user_service(body, id_user)

        return res.status(200).json({
            'user_update': update_user
        })

    } catch (error) {
        console.log('error :', error)
        return res.status(400).json({'message': 'erreur dans le controller'})
    }
}

export const obtenir_user_controller = async(req, res) => {

    try {
        const {id_user} = req.params
        const user = await obtenir_user_service(id_user)

        return res.status(200).json({
            'user': user
        })
    } catch (error) {
        return res.status(400).json({'message': 'erreur dans le controller'})
    }
}

