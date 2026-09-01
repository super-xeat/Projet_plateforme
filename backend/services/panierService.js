import { 
    ajouter_produit_panier,
    creer_panier,
    Obtenir_panier,
    verify_product,
    Update_quantity,
    verify_panier
} from "../models/panier.js";



export const Ajouter_panier_ou_creer = async(id_product, quantity, id_user) => {

    if (!id_user || !id_product || !quantity) {
        throw {statut: 404, 'message': 'champs manquant'}
    }
    const panier_exist = await verify_panier(id_user)
    
    if (panier_exist) {
        
        const id_panier = panier_exist.id_panier
        const product = await verify_product(id_panier, id_product)
        
        if (product) {
            const newquantity = Number(product.quantity) + Number(quantity)
            
            await Update_quantity(newquantity, id_panier, id_product)
            const response = 1
            return response

        } else {
            await ajouter_produit_panier(id_product, id_panier, quantity) 
            const response = 2
            return response
        }

    } else {
        
        const Idpanier = await creer_panier(id_user)       
        await ajouter_produit_panier(id_product, Idpanier, quantity)  
        const response = 3
        return response
    }

}
 

export const Obtenir_panier_service = async(id_user) => {
    if (!id_user) {
        throw {statut: 500, 'message': 'erreur panier'}
    }
    const panier = await Obtenir_panier(id_user)
    return panier
}