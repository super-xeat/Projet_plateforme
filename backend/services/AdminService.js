
import { 
    Ajout_annees,
    Ajout_model,
    Ajout_marque,
    Creation_vehicule,

    Ajout_product,
    Ajout_liaison_vehicule,

    delete_product,
    Obtenir_products_admin
 } from "../models/admin.js";


export const Ajout_annees_service = async(annees) => {

    if (!annees || annees.trim() === "") {
        throw {status : 401, 'message': 'il manque un champs'}
    }
    await Ajout_annees(annees)
}

export const Ajout_marque_service = async(marque) => {

    if (!marque || marque.trim() === "") {
        throw {status : 401, 'message': 'il manque un champs'}
    }
    await Ajout_marque(marque)
}


export const Ajout_model_service = async(model, id_marque) => {

    if (!model || model.trim() === "" || !id_marque) {
        throw {status : 401, 'message': 'il manque un champs'}
    }
    await Ajout_model(model, id_marque)
}


export const Creation_vehicule_service = async(name, id_model, id_annees) => {

    if (!name.trim('') || !id_model || !id_annees ) {
        throw {status: 401, 'message': 'il manque un champs'}
    }

    await Creation_vehicule(name, id_model, id_annees)
}

// ------------------------------------

export const Ajout_produit_service = async(name, description, price, image, id_categorie, stock, valuesVehicule) => {

    if (!name || !description || !price || !image || !id_categorie || !stock) {
        throw {status: 401, 'message': 'il manque un champs'}
    }
    const product = await Ajout_product(name, description, price, image, id_categorie, stock)
    const Idproduct = product[0].insertId

    console.log('product :', product)
    if (!valuesVehicule || valuesVehicule.length === 0) {
        throw {status: 401, 'message': 'probleme de liste vehicule'}
    }
    
    const valueFinal = valuesVehicule.map(id_vehicule => [Idproduct, Number(id_vehicule)])
    
    await Ajout_liaison_vehicule(valueFinal)
} 


// --------------------------------------


export const delete_product_service = async(id_product) => {

    if (!id_product) {
        throw {statut: 400, 'message': 'il manque id_product'}
    }

    await delete_product(id_product)
}

export const Obtenir_product_admin_service = async(page) => {
    if (!page) {
        throw {status: 400, 'message': 'page introuvable'}
    }

    const limit = 5
    const offset = (page - 1) * limit

    const result = await Obtenir_products_admin(limit, offset)
    return result
}