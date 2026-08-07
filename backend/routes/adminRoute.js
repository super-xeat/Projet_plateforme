import { Router } from "express";
import { 
    Ajout_annees_controllers,
    Ajout_categorie_controllers,
    Ajout_model_controllers,
    Ajout_marque_controllers
} from '../controllers/AdminController.js';



const routeAdmin = Router()

routeAdmin.post('/creation_cate', Ajout_categorie_controllers)
routeAdmin.post('/creation_annees', Ajout_annees_controllers)
routeAdmin.post('/creation_marque', Ajout_marque_controllers)
routeAdmin.post('/creation_model', Ajout_model_controllers)

export default routeAdmin