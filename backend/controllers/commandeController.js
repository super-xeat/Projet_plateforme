

import { CommandeService } from "../services/commandeService.js";


export const commandeController = async(req, res) => {

    try {
        const {date, statut, montant_total, id_user, adresse_livraison} = req.body

        const commande = await CommandeService(date, statut, montant_total, id_user, adresse_livraison)

        return res.status(201).json({
            'commande': commande,
            'message': 'commande créé avec succés'
        })
    } catch (error) {
        console.log('erreur dans le controller :', error)
        return res.status(500).json({'message': 'erreur controller'})
    }
}