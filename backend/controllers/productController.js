import { 
    Get_categorie_service,
    Get_marque_service,
    Get_model_service,
    Get_annees_service
    
 } from "../services/productService.js"


 
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