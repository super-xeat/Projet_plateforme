
import { commande_panier_controller, commande_cours_controller, commande_passer_controller } from "../controllers/commandeController.js";
import { Authentificate } from "../middleware/verif_token.js";

import { Router } from "express";


const commandeRoute = Router()


commandeRoute.post('/create_commande',Authentificate, commande_panier_controller)
commandeRoute.get('/commande_passer', Authentificate, commande_passer_controller)
commandeRoute.get('/commande_cours', Authentificate, commande_cours_controller)


export default commandeRoute;