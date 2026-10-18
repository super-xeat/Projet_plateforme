
import { 
    Ajout_annees,
    Ajout_model,
    Ajout_marque,
    Creation_vehicule,

    Ajout_product,
    Ajout_liaison_vehicule,

    delete_product,
    Obtenir_products_admin,
    obtenir_commande,
    modify_commande,
    nbcommande,
    product_critique,
    chiffre_affaire,
    stock_critique,

    Obtenir_products_all_admin
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


export const Obtenir_product_admin_service = async(id_categorie, page) => {
    if (!page) {
        throw {status: 400, 'message': 'page introuvable'}
    }

    const limit = 5
    const offset = (page - 1) * limit

    if (!id_categorie || id_categorie === 'undefined' || id_categorie === 'null') {
        const result = await Obtenir_products_all_admin(limit, offset)
        return result
    }
    const result = await Obtenir_products_admin(id_categorie, limit, offset)
    return result
}


export const obtenir_commande_service = async() => {

    const commande = await obtenir_commande()
    if (commande.length === 0) {
        throw {statut: 400, 'message': 'liste de commande vide'}
    }

    return commande
}


export const modify_commande_service = async(statut, id_commande) => {

    if (!id_commande || !statut) {
        throw {statut: 400, 'message': 'champs manquant'}
    }

    await modify_commande(statut, id_commande)
}


export const nb_commande_service = async() => {

    const result = await nbcommande()
    if (result === 0) {
        throw {statut: 200, 'message': 'pas de commande'}
    }

    return result
}

export const chiffre_affaire_service = async() => {

    const chiffre_affaire_result = await chiffre_affaire()
    if (chiffre_affaire_result === 0 || chiffre_affaire_result === null) {
        throw {statut: 200, 'message': 'pas de CA'}
    }
    return chiffre_affaire_result
}

export const stock_critique_service = async() => {

    const stock_critique_result = await stock_critique()
    if (stock_critique_result === 0) {
        throw {statut: 200, 'message': 'pas de stock critique'}
    }

    return stock_critique_result
}


export const product_critique_service = async(page) => {

    if (!page) {
        throw {statut: 400, 'message': 'il mannque la page'}
    }

    const limit = 5
    const offset = (page - 1) * limit

    const prod_critique_result = await product_critique(limit, offset)
    
    if (prod_critique_result.length === 0) {
        throw {statut: 200, 'message': 'liste vide'}
    }

    return prod_critique_result
}