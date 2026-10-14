import { 
    Obtenir_panier_service,
    Ajouter_panier_ou_creer,
    delete_product_service,
    update_quantity_service,
    delete_all_service,
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
        console.log('id_product ', id_product)
        console.log('quantity ', quantity)
        console.log('id_user ', id_user)

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
            return res.status(200).json({
            'message': 'panier créer et produit ajouté'
            })
        }

    } catch (error) {
        console.log('error dans le controller :', error)
        return res.status(500).json({'message': 'erreur serveur'})
    }
}

export const delete_product_controller = async(req, res) => {
    try {
        const {id_product, id_panier} = req.params

        await delete_product_service(id_product, id_panier)

        return res.status(200).json({'success': 'product delete'})

    } catch (error) {
        console.log('error dans le controller :', error)
        return res.status(500).json({'message': 'erreur serveur'})
    }
}


export const delete_all_controller = async(req, res) => {
    try {
        const {id_panier} = req.params
        await delete_all_service(id_panier)

        return res.status(200).json({'message': 'panier vidé'})

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({'message': error})
    }
}


export const update_quantity_controller = async(req, res) => {
    try {
        const {quantity} = req.body
        const {id_product, id_panier} = req.params

        await update_quantity_service(quantity, id_product, id_panier)
        return res.status(200).json({'success': 'quantity update'})

    } catch (error) {
        console.log('error dans le controller :', error)
        return res.status(500).json({'message': 'erreur serveur'})
    }
}