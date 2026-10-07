
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
        

const sql_login = `SELECT id_user, pseudo, role, mot_de_passe, email, adresse FROM user WHERE email= ?`

export const Login = async(email) => {
    const user = await db.query(sql_login, [email])
    console.log('user_model :', user)
    return user ? user[0] : null
}

const sql_user_all = `SELECT * FROM user`

export const User_all = async() => {
    const [users] = await db.query(sql_user_all)
    return users
}


const sql_user = `SELECT * FROM user WHERE id_user = ?`
export const obtenir_user = async(id_user) => {
    const [result] = await db.query(sql_user, [id_user])
    return result[0]
}


export const update_user = async(body, id_user) => {

    const {nom, prenom, email, adresse, pseudo} = body

    let value = []
    let liste = []
    if (nom) {
        value.push('nom = ?')
        liste.push(nom)
    }
    if (prenom) {
        value.push('prenom = ?')
        liste.push(prenom)
    }
    if (email) {
        value.push('email = ?')
        liste.push(email)
    }
    if (pseudo) {
        value.push('pseudo = ?')
        liste.push(pseudo)
    }
    if (adresse) {
        value.push('adresse = ?')
        liste.push(adresse)
    }

    liste.push(id_user)
    const sql_update_user = `UPDATE user SET ${value.join(', ')} WHERE id_user = ?`
    const [update_user] = await db.query(sql_update_user, liste)
    return update_user
}