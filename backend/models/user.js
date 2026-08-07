
import { db } from "../database/config.js";

const create_user_sql = `INSERT INTO user(nom, prenom, email, mot_de_passe, adresse, role, pseudo) VALUES (?, ?, ?, ?, ?, ?, ?)`

export const create_user = async(nom, prenom, email, mot_de_passe, adresse, role, pseudo) => {
    const newClient = await db.query(create_user_sql, [nom, prenom, email, mot_de_passe, adresse, role, pseudo])
    return newClient[0].insertId
}


const findbyID_sql = `SELECT * FROM user WHERE nom = ? OR email = ?`

export const find_user = async(nom, email) => {
    const user = await db.query(findbyID_sql, [nom, email])

    return user ? user[0].id_user : null
}
        


const sql_login = `SELECT id_user, pseudo, role, mot_de_passe FROM user WHERE email= ?`

export const Login = async(email) => {
    const user = await db.query(sql_login, [email])
    console.log('user_model :', user)
    return user ? user[0] : null
}




