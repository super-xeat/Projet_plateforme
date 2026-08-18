import { db } from "../database/config.js";


const sql_ajouter_marque = `INSERT INTO marque(name) VALUES (?)`

export const Ajout_marque = async(name) => {
    await db.query(sql_ajouter_marque, [name])
}


const sql_ajouter_annees = `INSERT INTO annees(name) VALUES (?)`

export const Ajout_annees = async(annees) => {
    await db.query(sql_ajouter_annees, [annees])
}

const sql_ajouter_model = `INSERT INTO model(name, id_marque) VALUES (?, ?)`

export const Ajout_model = async(model, id_marque) => {
    await db.query(sql_ajouter_model, [model, id_marque])
}

const sql_ajouter_categorie = `INSERT INTO categorie(name) VALUES (?)`

export const Ajout_categorie = async(categorie) => {
    await db.query(sql_ajouter_categorie, [categorie])
}

// -----------------------------------------------


const sql_creation_vehicule = `INSERT INTO vehicule(name, id_model, id_annees) VALUES (?, ?, ?)`
export const Creation_vehicule = async(name, id_model, id_annees) => {
    const vehicule = await db.query(sql_creation_vehicule, [name, id_model, id_annees])
    return vehicule.insertId
}


// -------------------------------------------------
const sql_ajouter_produit = `INSERT INTO product(name, description, price, image, id_categorie, stock) VALUES (?, ?, ?, ?, ?, ?)`
export const Ajout_product = async(name, description, price, image, id_categorie, stock) => {
    const product = await db.query(sql_ajouter_produit, [name, description, price, image, id_categorie, stock])
    console.log('product :', product)
    return product
}
// values doit etre une liste 

const sql_liaison_product = `INSERT INTO product_vehicule(id_product, id_vehicule) VALUES ?` 
export const Ajout_liaison_vehicule = async(values) => { 
    await db.query(sql_liaison_product, [values]) 
}
 

//----------------------------------------

const sql_delete_categorie = `DELETE FROM categorie WHERE id_categorie = ?`
export const Delete_categorie = async(id_categorie) => {
    await db.query(sql_delete_categorie, [id_categorie])
}