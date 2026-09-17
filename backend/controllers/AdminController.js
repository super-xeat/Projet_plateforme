
import { 
    Ajout_annees_service,
    Ajout_categorie_service,
    Ajout_model_service,
    Ajout_marque_service,
    Creation_vehicule_service,

    Ajout_produit_service,

    Delete_categorie_service,
    delete_product_service
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

export const Creation_vehicule_controller = async(req, res) => {

    try {
        const {name, id_model, id_annees} = req.body
        await Creation_vehicule_service(name, id_model, id_annees)

        return res.status(201).json({'message': 'vehicule créer'})

    } catch (error) {
        console.error('error vehicule controller', error)
    }
}


export const Ajout_produit_Controller = async(req, res) => {
    try {
        
        const {name, description, price, image, id_categorie, stock,  valuesVehicule} = req.body
        await Ajout_produit_service(name, description, price, image, id_categorie, stock, valuesVehicule)

        return res.status(201).json({'message': 'produit créer'})

    } catch (error) {
        console.error('error controller :', error)
    }
}

export const Delete_categorie_controller = async(id_categorie) => {

    try {
        const {id_categorie} = req.params
        await Delete_categorie_service(id_categorie)

        return res.status(201).json({'message': `categorie supprimé`})
    } catch (error) {
        console.log('erreur :', error)
    }
}


export const delete_product_controller = async(req, res) => {

    try {
        const {id_product} = req.params
        await delete_product_service(id_product)

        return res.status(200).json({'message': 'produit supprimé'})

    } catch (error) {
        console.log('erreur :', error)
        return res.status(500).json({
            'message': 'probleme dans le delete controller'
        })
    }
}