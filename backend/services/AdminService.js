
import { 
    Ajout_annees,
    Ajout_categorie,
    Ajout_model,
    Ajout_marque,
    Creation_vehicule,

    Ajout_product,
    Ajout_liaison_vehicule,

    Delete_categorie,
    delete_product
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

export const Ajout_categorie_service = async(categorie) => {

    if (!categorie || categorie.trim() === "") {
        throw {status : 401, 'message': 'il manque un champs'}
    }
    await Ajout_categorie(categorie)
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
export const Delete_categorie_service = async(id_categorie) => {
    if (!id_categorie) {
        throw {status: 401, 'message': 'il manque un id'}
    }

    await Delete_categorie(id_categorie)
}

export const delete_product_service = async(id_product) => {

    if (!id_product) {
        throw {statut: 400, 'message': 'il manque id_product'}
    }

    await delete_product(id_product)
}