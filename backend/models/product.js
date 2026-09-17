
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
    

const Obtenir_produit_sql = `SELECT *
                            FROM product
                            JOIN categorie
                            ON product.id_categorie = categorie.id_categorie
                            WHERE product.id_categorie = ?`

export const Obtenir_product = async(id_categorie) => {
    const [result] = await db.query(Obtenir_produit_sql, [id_categorie])
    return result
}


const Obtenir_produit_card_sql = `SELECT * FROM product WHERE id_product = ?`
export const Obtenir_product_card = async(id_product) => {
    const [result] = await db.query(Obtenir_produit_card_sql, [id_product])
    return result
}


const Product_sql = `SELECT * FROM product`
export const Obtenir_products = async() => {
    const [result] = await db.query(Product_sql)
    return result
}




export const Recherche_product = async(query) => {
    const {marque, model, vehicule, annees} = query

    let recherche_sql = `SELECT * FROM product
                       JOIN product_vehicule
                       ON product_vehicule.id_product = product.id_product
                       JOIN vehicule
                       ON product_vehicule.id_vehicule = vehicule.id_vehicule
                       JOIN model
                       ON vehicule.id_model = model.id_model
                       JOIN marque
                       ON marque.id_marque = model.id_marque
                       JOIN annees
                       ON vehicule.id_annees = annees.id_annees
                       WHERE 1=1`
                       
    let value = []
    if (marque) {
        recherche_sql += ` AND marque.name = ?`
        value.push(marque)
    }
    if (model) {
        recherche_sql += ` AND model.name = ?`
        value.push(model)
    }
    if (annees) {
        recherche_sql += ` AND annees.name = ?`
        value.push(annees)
    }
    if (vehicule) {
        recherche_sql += ` AND vehicule.name = ?`
        value.push(vehicule)
    }

    const [result] = await db.query(recherche_sql, value)
    return result
} 


