
import { UserService_create, Login_service } from "../services/userService.js";


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
        const user = await Login_service(email, password)
        

        const user_trouver = {
            'id': user.id_user,
            'pseudo': user.pseudo,
            'role': user.role,
            'message': 'utilisateur trouvé avec succés'
        }
        console.log('user :', user_trouver)

        return res.status(200).json(user_trouver)

    } catch (error) {
        console.log('erreur :', error)
        return res.status(500).json({'message': error})
    }
}