import { 
    Obtenir_panier_controller,
    Ajouter_panier_creer_controller
 } from "../controllers/panierController.js";

import { Router } from "express";


const panierRoute = Router()

panierRoute.get('/obtenir_panier/:id_user', Obtenir_panier_controller)
panierRoute.post('/panier_creation_update',  Ajouter_panier_creer_controller)


export default panierRoute