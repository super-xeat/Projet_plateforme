import { 
    Obtenir_panier_controller,
    Ajouter_panier_creer_controller,
    delete_product_controller,
    update_quantity_controller,
    delete_all_controller
 } from "../controllers/panierController.js";

import { Authentificate } from "../middleware/verif_token.js";

import { Router } from "express";


const panierRoute = Router()

panierRoute.get('/obtenir_panier/:id_user', Authentificate, Obtenir_panier_controller)
panierRoute.post('/panier_creation_update', Authentificate, Ajouter_panier_creer_controller)
panierRoute.delete('/delete_product/:id_product/:id_panier', Authentificate, delete_product_controller )
panierRoute.delete('/delete_all/:id_panier', Authentificate, delete_all_controller)
panierRoute.patch('/update_quantity/:id_product/:id_panier', Authentificate, update_quantity_controller)


export default panierRoute