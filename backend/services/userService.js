
import { create_user, find_user, Login } from "../models/user.js";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'


export const UserService_create = async(nom, prenom, email, mdp, adresse, pseudo) => {
 
    const user_trouver = await find_user(nom, email)
    if (user_trouver) {
        throw {status: 500 ,'message': 'user trouvé'}
        // throw renvoi l'erreur au controller
        
    } else {
        const mot_de_passe = await bcrypt.hash(mdp, 10)
        const userid = await create_user(nom, prenom, email, mot_de_passe, adresse, "client", pseudo)
        return userid
    }
}


export const Login_service = async(email, password) => {

    const user_result = await Login(email)
    
    if (!user_result) {
        throw {status: 401, 'message': 'problème identifiant'}
    }
    
    const user = user_result[0]
    console.log('user middleware : ', user)
    const mot_de_passe = await bcrypt.compare(password, user.mot_de_passe)
    if (!mot_de_passe) {
        throw {status: 401, 'message': 'erreur identifiant'}
    }
    
    // construction du toekn
    const token = jwt.sign(

        { "userid": user.id_user, "role": user.role },
        process.env.SECRET_KEY,
        {expiresIn: '3h'}
    )
    
    
    return {user, token}
}
