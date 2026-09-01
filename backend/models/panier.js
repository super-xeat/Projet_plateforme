
import { db } from "../database/config.js";



const sql_verify_product = `SELECT id_product, quantity
                            FROM product_panier 
                            WHERE id_panier = ?
                            AND id_product = ?`
export const verify_product = async(id_panier, id_product) => {
    const [product] = await db.query(sql_verify_product, [id_panier, id_product])
    
    return product[0]
}


const sql_update_product = `UPDATE product_panier
                            SET quantity = ?
                            WHERE id_panier = ?
                            AND id_product = ?`
export const Update_quantity = async(quantity, id_panier, id_product) => {
    await db.query(sql_update_product, [quantity, id_panier, id_product])
}


const sql_verify_panier = `SELECT id_panier FROM panier WHERE id_user = ?`
export const verify_panier = async(id_user) => {
    const [panier] = await db.query(sql_verify_panier, [id_user])
    
    return panier[0]
} 

const sql_panier = `INSERT INTO panier (id_user) VALUES (?)`
export const creer_panier = async(id_user) => {
    const [panier] = await db.query(sql_panier, [id_user])

    return panier.insertId
}


const sql_panier_liaison = `INSERT INTO product_panier(id_product, id_panier, quantity) 
                            VALUES (?, ?, ?)`
export const ajouter_produit_panier = async(id_product, id_panier, quantity) => {
    await db.query(sql_panier_liaison, [id_product, id_panier, quantity])
}


const sql_obtenir_panier = `SELECT p.id_product, p.name, p.description, p.price, p.image, p.stock, pp.quantity
                            from product p
                            JOIN product_panier pp ON p.id_product = pp.id_product
                            JOIN panier pa ON pa.id_panier = pp.id_panier
                            WHERE pa.id_user=?`

export const Obtenir_panier = async(id_user) => {
    const [panier] = await db.query(sql_obtenir_panier, [id_user])
    return panier
}


