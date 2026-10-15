import { Router } from "express";
import { 
    Ajout_annees_controllers,
    Ajout_model_controllers,
    Ajout_marque_controllers,
    Creation_vehicule_controller,

    Ajout_produit_Controller,

    delete_product_controller,
    obtenir_product_admin_controller,
    obtenir_commande_controller,
    modify_commande_controller,

    chiffre_affaire_controller,
    stock_critique_controller,
    product_critique_controller,
    nb_commande_controller

} from '../controllers/AdminController.js';

import { Authentificate, Autorisation } from "../middleware/verif_token.js";


const routeAdmin = Router()

routeAdmin.post('/creation_annees', Authentificate, Autorisation, Ajout_annees_controllers)
routeAdmin.post('/creation_marque', Authentificate, Autorisation, Ajout_marque_controllers)
routeAdmin.post('/creation_model', Authentificate, Autorisation, Ajout_model_controllers)
routeAdmin.post('/creation_vehicule', Authentificate, Autorisation, Creation_vehicule_controller)
routeAdmin.post('/ajout_produit', Authentificate, Autorisation, Ajout_produit_Controller)
routeAdmin.delete('/supprimer_produit/:id_product', Authentificate, Autorisation, delete_product_controller )
routeAdmin.get('/obtenir_prod', Authentificate, Autorisation, obtenir_product_admin_controller)
routeAdmin.get('/obtenir_commande', Authentificate, Autorisation, obtenir_commande_controller)
routeAdmin.patch('/modify_commande/:id_commande', Authentificate, Autorisation, modify_commande_controller)
routeAdmin.get('/nb_commande', Authentificate, Autorisation, nb_commande_controller)
routeAdmin.get('/chiffre_affaire', Authentificate, Autorisation, chiffre_affaire_controller)
routeAdmin.get('/stock_critique', Authentificate, Autorisation, stock_critique_controller)
routeAdmin.get('/product_critique_liste', Authentificate, Autorisation, product_critique_controller)


export default routeAdmin