
import { db } from "../database/config.js";


const sql_commande = `INSERT INTO commande(date, statut, montant_total, id_user, adresse_livraison) VALUES (?, ?, ?, ?, ?)`

export const commande = async(connection, date, statut, montant_total, id_user, adresse_livraison) => {
    const [commande] = await connection.query(sql_commande, [date, statut, montant_total, id_user, adresse_livraison])
    return commande.insertId
}
 

const sql_commande_product = `INSERT INTO product_commande(id_commande, id_product, quantity, prix_achat) VALUES (?, ?, ?, ?)`
 
export const commande_panier = async(connection, id_commande, id_product, quantity, prix_achat) => {
    await connection.query(sql_commande_product, [id_commande, id_product, quantity, prix_achat])
}


const sql_trouver_panier = `DELETE FROM panier WHERE id_user = ?`
                           
export const supp_panier = async(connection,id_user) => {
    await connection.query(sql_trouver_panier, [id_user])
}


const sql_recup_prod = `SELECT stock FROM product WHERE id_product = ?`

export const recup_prod = async(connection, id_product) => {
    const [result] = await connection.query(sql_recup_prod, [id_product])
    return result[0].stock
}

const sql_stock_update = `UPDATE product
                         SET stock = ?
                         WHERE id_product = ?`

export const update_product_stock = async(connection, stock, id_product) => {
    await connection.query(sql_stock_update, [stock, id_product])
}

const sql_trouver_panierProduct= `SELECT product_panier.id_product, product_panier.id_panier, product_panier.quantity
                                 FROM product_panier
                                 JOIN panier
                                 ON product_panier.id_panier = panier.id_panier
                                 WHERE panier.id_user = ?`

export const trouver_panierProduct = async(id_user) => {
    const [result] = await db.query(sql_trouver_panierProduct, [id_user])
    return result
}

const sql_trouver_prix = `SELECT price FROM product WHERE id_product = ?`
export const trouver_prix = async(id_product) => {
    const [price] = await db.query(sql_trouver_prix, [id_product])
    return price[0].price
}

const sql_adresse = `SELECT adresse FROM user WHERE id_user = ?`
export const trouver_adresse = async(id_user) => {
    const [result] = await db.query(sql_adresse, [id_user])
    return result[0].adresse
}


