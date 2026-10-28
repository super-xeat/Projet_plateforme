

import { passer_commande_service, 
    commande_cours_service, 
    commande_passer_service,
    product_cours_service,
    product_passer_service
 } from "../services/commandeService.js";

  

export const commande_panier_controller = async(req, res) => {
    try {
        
        const id_user = req.user.id

        console.log('id_user :', id_user)

        await passer_commande_service(id_user)

        return res.status(201).json({
            'message': 'commande créé avec succés'
        })

    } catch (error) {
        console.log('erreur dans le controller :', error)
        return res.status(500).json({'message': 'erreur controller'})
    }
}

export const commande_cours_controller = async(req, res) => {
    try {
        const id_user = req.user.id
        const commande = await commande_cours_service(id_user)
        
        return res.status(201).json({
            'commande_cours': commande
        })
        
    } catch (error) {
        console.log('erreur dans le controller :', error)
        return res.status(500).json({'message': 'erreur controller'})
    }
}


export const commande_passer_controller = async(req, res) => {
    try {
        const id_user = req.user.id
        const commande = await commande_passer_service(id_user)

        return res.status(201).json({
            'commande_passer': commande
        })

    } catch (error) {
        console.log('erreur dans le controller :', error)
        return res.status(500).json({'message': 'erreur controller'})
    }
}