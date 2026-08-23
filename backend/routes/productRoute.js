
import { 
    Get_categorie_controller,
    Get_marque_controller,
    Get_model_controller,
    Get_annees_controller,

    Obtenir_vehicule_controller,
    Obtenir_produit_controller,
    Obtenir_produit_card_controller,
    Obtenir_product_all_controller
} from "../controllers/productController.js";

import { Router } from "express";

 
const routeProduct = Router()

routeProduct.get('/obtenir_categorie', Get_categorie_controller)
routeProduct.get('/obtenir_marque', Get_marque_controller)
routeProduct.get('/obtenir_model', Get_model_controller)
routeProduct.get('/obtenir_annees', Get_annees_controller)
routeProduct.get('/obtenir_vehicule', Obtenir_vehicule_controller)

routeProduct.get('/obtenir_product/:id_categorie', Obtenir_produit_controller)
routeProduct.get('/obtenir_product_card/:id_product', Obtenir_produit_card_controller)
routeProduct.get('/obtenir_all', Obtenir_product_all_controller)

export default routeProduct
