import { 
    Obtenir_panier_service,
    Ajouter_panier_ou_creer
 } from "../services/panierService.js"


export const Obtenir_panier_controller = async(req, res) => {

    try {
        const {id_user} = req.params
        const panier = await Obtenir_panier_service(id_user)
        return res.status(200).json({
            'panier': panier,       
        })

    } catch (error) {
        console.log('erreur dans le controller', error)
        return res.status(500).json({'message': 'erreur serveur'})
    } 
}

export const Ajouter_panier_creer_controller = async(req, res) => {

    try {
        const {id_product, quantity, id_user} = req.body
        const response = await Ajouter_panier_ou_creer(id_product, quantity, id_user)
 
        if (response === 1) {
            return res.status(200).json({
            'message': 'quantity mis a jour'
            })
        } else if (response === 2) {
            return res.status(200).json({
            'message': 'produit ajouté'
            })
        } else {
            return res.status(404).json({
            'message': 'panier créer et produit ajouté'
            })
        }

    } catch (error) {
        console.log('error dans le controller :', error)
        return res.status(500).json({'message': 'erreur serveur'})
    }
}