
import { 
    Ajout_annees_service,
    Ajout_categorie_service,
    Ajout_model_service,
    Ajout_marque_service
 } from "../services/AdminService.js";


export const Ajout_annees_controllers = async(req, res) => {

    try {
        const {annees} = req.body
        await Ajout_annees_service(annees)

        return res.status(201).json({'message': 'annees créer'})

    } catch(error) {
        console.error('error annees controller :', error)
    }
}

export const Ajout_marque_controllers = async(req, res) => {

    try {
        const {marque} = req.body
        await Ajout_marque_service(marque)

        return res.status(201).json({'message': 'marque créer'})

    } catch(error) {
        console.error('error marque controller :', error)
    }
}

export const Ajout_categorie_controllers = async(req, res) => {

    try {
        const {categorie} = req.body
        await Ajout_categorie_service(categorie)

        return res.status(201).json({'message': 'categorie créer'})

    } catch(error) {
        console.error('error categorie controller :', error)
    }
}

export const Ajout_model_controllers = async(req, res) => {

    try {
        const {model, id_marque} = req.body
        await Ajout_model_service(model, id_marque)

        return res.status(201).json({'message': 'model créer'})

    } catch(error) {
        console.error('error model controller :', error)
    }
}