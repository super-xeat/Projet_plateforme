 
import { 
    Get_categorie_service,
    Get_marque_service,
    Get_model_service,
    Get_annees_service,

    Obtenir_vehicule_service,
    Obtenir_product_service,
    Obtenir_product_card_service,
    Obtenir_products_all_service,

    Recherche_product_service
 } from "../services/productService.js"

import { total_cate_product, total_product_all } from "../models/product.js"
 

export const Get_categorie_controller = async(req, res) => {
    try {
        const result = await Get_categorie_service()
        return res.status(200).json({
            'listeCategorie': result,
            'message': 'categorie success'
        })

    } catch (error) {
        console.log('erreur get du controller :', error)       
    }
}

export const Get_marque_controller = async(req, res) => {
    try {
        const result = await Get_marque_service()
        return res.status(200).json({
            'listeMarque': result,
            'message': 'marque success'
        })

    } catch (error) {
        console.log('erreur get du controller :', error)       
    }
}


export const Get_model_controller = async(req, res) => {
    try {
        const result = await Get_model_service()
        return res.status(200).json({
            'listeModel': result,
            'message': 'model success'
        })

    } catch (error) {
        console.log('erreur get du controller :', error)       
    }
}


export const Get_annees_controller = async(req, res) => {
    try {
        const result = await Get_annees_service()
        return res.status(200).json({
            'listeAnnees': result,
            'message': 'annees success'
        })

    } catch (error) {
        console.log('erreur get du controller :', error)       
    }
}

export const Obtenir_vehicule_controller = async(req, res) => {
    try {
        const result = await Obtenir_vehicule_service()
        return res.status(200).json({
            'listeVehicule': result,
            'message': 'vehicule success'
        })

    } catch (error) {
        console.log('erreur get du controller :', error)       
    }
}


export const Obtenir_produit_controller = async(req, res) => {
    try {
        const {id_categorie} = req.params
        const {valeur, page} = req.query

        const result = await Obtenir_product_service(valeur, id_categorie, Number(page))
        const total = await total_cate_product(Number(id_categorie))

        
        console.log('result :', result)
        return res.status(200).json({
            'listeProduct': result,
            'total': total,
            'message': 'product success'
        })

    } catch(error) {
        console.log('erreur du controller :', error)
        return res.status(error.status || 500).json({
            'message': error.message || 'Erreur serveur'
        })
    }
}

export const Obtenir_produit_card_controller = async(req, res) => {
    try {
        const {id_product} = req.params
        const result = await Obtenir_product_card_service(id_product)
        return res.status(200).json({
            'listeproductcard': result,
            'message': 'product success'
        })
        
    } catch(error) {
        console.log('erreur du controller :', error)
        return res.status(500).json({
            'message': 'Erreur serveur'
        })
    }
}

export const Obtenir_product_all_controller = async(req, res) => {

    const {page, valeur} = req.query

    try {
        const total = await total_product_all()
        const result = await Obtenir_products_all_service(valeur, Number(page))

        return res.status(200).json({
            'productAll': result,
            'total': total
        }) 

    } catch (error) {
        console.log('error :', error)
        return res.status(500).json({'message': 'erreur serveur'})
    }
}


export const Recherche_product_controller = async(req, res) => {

    try {
        const query = req.query

        const result = await Recherche_product_service(query)
        console.log('result controller :', result)
        return res.status(200).json({
            'result': result
        })

    } catch (error) {
        console.log('erreur controller :', error)
        return res.status(400).json({'message': error})
    }
}


