
import { commande } from "../models/commande.js";


export const CommandeService = async(date, statut, montant_total, id_user, adresse_livraison) => {
    if (!date || !statut || !montant_total || !id_user || !adresse_livraison) {
        throw {statut: 400, 'message': 'il manque un champs'}
    }

    const id_Createcommande = await commande(date, statut, montant_total, id_user, adresse_livraison)
    return id_Createcommande
}