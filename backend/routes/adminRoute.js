import { Router } from "express";
import { 
    Ajout_annees_controllers,
    Ajout_categorie_controllers,
    Ajout_model_controllers,
    Ajout_marque_controllers,
    Creation_vehicule_controller
} from '../controllers/AdminController.js';

import { Authentificate, Autorisation } from "../middleware/verif_token.js";


const routeAdmin = Router()

routeAdmin.post('/creation_cate', Authentificate, Autorisation ,Ajout_categorie_controllers)
routeAdmin.post('/creation_annees', Authentificate, Autorisation, Ajout_annees_controllers)
routeAdmin.post('/creation_marque', Authentificate, Autorisation, Ajout_marque_controllers)
routeAdmin.post('/creation_model', Authentificate, Autorisation, Ajout_model_controllers)
routeAdmin.post('/creation_vehicule', Authentificate, Autorisation, Creation_vehicule_controller)

export default routeAdmin