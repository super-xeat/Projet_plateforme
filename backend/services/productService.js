
import { 
    Get_annees,
    Get_categorie, 
    Get_marque,
    Get_model,
    
    Obtenir_vehicule,
    Obtenir_product,
    Obtenir_product_card,
    Obtenir_products,

    Recherche_product
 } from "../models/product.js"


export const Get_categorie_service = async() => {
    const result = await Get_categorie()
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}

export const Get_marque_service = async() => {
    const result = await Get_marque()
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}

export const Get_annees_service = async() => {
    const result = await Get_annees()
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}

export const Get_model_service = async() => {
    const result = await Get_model()
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}

export const Obtenir_vehicule_service = async() => {
    const result = await Obtenir_vehicule()
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}


export const Obtenir_product_service = async(valeur, id_categorie, page) => {
    if (!page) {
        throw {status: 400, 'message': 'page introuvable'}
    }
    const motif = `%${valeur ?? ''}%`
    const limit = 8
    const offset = (page - 1) * limit

    const result = await Obtenir_product(motif, id_categorie, limit, offset)
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}
 

export const Obtenir_product_card_service = async(id_product) => {
    const result = await Obtenir_product_card(id_product)
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}


export const Obtenir_products_all_service = async(valeur, page) => {
    if (!page) {
        throw {status: 400, 'message': 'page introuvable'}
    }
    
    const motif = `%${valeur ?? ''}%`
    const limit = 8
    const offset = (page - 1) * limit

    const result = await Obtenir_products(motif, limit, offset)
    if (result.length === 0) {
        throw {status: 404, 'message': 'liste vide'}
    }
    return result
}

export const Recherche_product_service = async(query) => {
    
    const {marque, model, vehicule, annees} = query
    if (!marque && !model && !vehicule && !annees) {
        throw {status: 400, 'message': 'il y a aucun champ'}
    }
    const result = await Recherche_product(query)
    console.log('result :', result)

    
    if (result.length === 0) {
        throw {status: 400, 'message': 'aucun produit'}
    }

    return result
}

