import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

export const Authentificate = async(req, res, next) => {

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({'message': 'pas autorisé'})
    }

    try {
        const verif = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verif
        next()
    } catch (error) {
        return res.status(403).json({ message: 'token invalide ou expiré'})
    }
}

export const Autorisation = async(req, res, next) => {
 
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'réservé aux administrateurs' })
    }
    next()
}