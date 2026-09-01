
import { db } from "../database/config.js";


const sql_commande = `INSERT INTO commande(date, statut, montant_total, id_user, adresse_livraison) VALUES (?, ?, ?, ?, ?)`

export const commande = async(date, statut, montant_total, id_user, adresse_livraison) => {
    const [commande] = await db.query(sql_commande, [date, statut, montant_total, id_user, adresse_livraison])
    return commande.insertId
}