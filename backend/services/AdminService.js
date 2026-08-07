
import { 
    Ajout_annees,
    Ajout_categorie,
    Ajout_model,
    Ajout_liaison,
    Ajout_marque,
    Ajout_product,
    Get_annees,
    Get_marque,
    Get_model
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