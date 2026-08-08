
import { 
    Get_annees,
    Get_categorie,
    Get_marque,
    Get_model
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