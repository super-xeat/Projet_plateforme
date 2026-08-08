
import { db } from "../database/config.js";

const Obtenir_categorie = `SELECT * FROM categorie ORDER by name DESC`

export const Get_categorie = async() => {
    const [result] = await db.query(Obtenir_categorie)
    return result 
}

const Obtenir_annees = `SELECT * FROM annees ORDER by name DESC`

export const Get_annees = async() => {
    const [result] = await db.query(Obtenir_annees)
    return result 
}

const Obtenir_marque = `SELECT * FROM marque ORDER by name DESC`
export const Get_marque = async() => {
    const [result] = await db.query(Obtenir_marque)
    return result 
}

const Obtenir_model = `SELECT * FROM model ORDER by name DESC`
export const Get_model = async() => {
    const [result] = await db.query(Obtenir_model)
    return result 
}