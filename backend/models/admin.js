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
 
const sql_count = `SELECT COUNT(*) AS total FROM product`
export const total = async() => {
    const [result_total] = await db.query(sql_count)
    return result_total[0].total
}

const Product_sql = `SELECT * FROM product LIMIT ? OFFSET ?`
export const Obtenir_products_admin = async(limit, offset) => {
    const [result] = await db.query(Product_sql, [limit, offset])
    return result
}
 

//----------------------------------------


const sql_delete = `DELETE FROM product WHERE id_product = ?`
export const delete_product = async(id_product) => {
    await db.query(sql_delete, [id_product])
}


const sql_commande = `SELECT commande.id_commande, 
                     commande.date, 
                     commande.statut, 
                     commande.montant_total, 
                     user.nom AS nom, 
                     user.email AS email
                     FROM commande
                     JOIN user
                     ON commande.id_user = user.id_user`

export const obtenir_commande = async() => {
    const [result] = await db.query(sql_commande)
    return result
}


const sql_modify_commande = `UPDATE commande SET statut = ? WHERE id_commande = ?`
export const modify_commande = async(statut, id_commande) => {
    await db.query(sql_modify_commande, [statut, id_commande])
}


const sql_nbcommande = `SELECT COUNT(*) AS nb_commande FROM commande`
export const nbcommande = async() => {
    const [result] = await db.query(sql_nbcommande)
    return result[0].nb_commande
}

// oublie pas pour les service si liste null 0
const sql_chiffre_affaire = `SELECT SUM(montant_total) AS chiffre_affaire FROM commande`
export const chiffre_affaire = async() => {
    const [result] = await db.query(sql_chiffre_affaire)
    return result[0].chiffre_affaire
}

const sql_stock = `SELECT COUNT(stock) AS stock_critique FROM product WHERE stock < 5`
export const stock_critique = async() => {
    const [result] = await db.query(sql_stock)
    return result[0].stock_critique
}

const sql_product_stock = `SELECT name, stock, image, id_product
                          FROM product
                          WHERE stock < 5`

export const product_critique = async() => {
    const [result] = await db.query(sql_product_stock)
    return result
}
