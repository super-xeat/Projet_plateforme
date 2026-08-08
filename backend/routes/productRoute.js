
import { 
    Get_categorie_controller,
    Get_marque_controller,
    Get_model_controller,
    Get_annees_controller
} from "../controllers/productController.js";

import { Router } from "express";


const routeProduct = Router()

routeProduct.get('/obtenir_categorie', Get_categorie_controller)
routeProduct.get('/obtenir_marque', Get_marque_controller)
routeProduct.get('/obtenir_model', Get_model_controller)
routeProduct.get('/obtenir_annees', Get_annees_controller)


export default routeProduct
