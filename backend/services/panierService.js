import { 
    ajouter_produit_panier,
    creer_panier,
    Obtenir_panier,
    verify_product,
    Update_quantity,
    verify_panier,
    delete_product,
    update_quantity,
    delete_all
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


export const delete_product_service = async(id_product, id_panier) => {
    if (!id_product || !id_panier) {
        throw {statut: 500, 'message': 'erreur id_product ou id_panier manquant'}
    }

    await delete_product(id_product, id_panier)
}

export const delete_all_service = async(id_panier) => {
    if (!id_panier) {
        throw {statut: 400, 'message': 'il manque id_panier'}
    }
    await delete_all(id_panier)
}


export const update_quantity_service = async(quantity, id_product, id_panier) => {
    if (!quantity || !id_product || !id_panier) {
        throw {status: 400, 'erreur': 'champs manquant'}
    }

    await update_quantity(quantity, id_product, id_panier)
}