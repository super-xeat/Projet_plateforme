
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

const Obtenir_model = `SELECT model.id_model, 
                       model.name AS model_name, 
                       marque.name AS marque_name
                       FROM model                      
                       JOIN marque
                       ON model.id_marque = marque.id_marque
                       ORDER by model.name DESC`

export const Get_model = async() => {
    const [result] = await db.query(Obtenir_model)
    return result 
}


const Obtenir_vehicule_sql = `SELECT vehicule.id_vehicule,
                              vehicule.name,
                              model.name as model_name,
                              annees.name as annees_name
                              FROM vehicule
                              JOIN model 
                              ON vehicule.id_model = model.id_model
                              JOIN annees
                              ON vehicule.id_annees = annees.id_annees
                              ORDER by vehicule.name DESC`

export const Obtenir_vehicule = async() => {
    const [result] = await db.query(Obtenir_vehicule_sql)
    return result
}
    
