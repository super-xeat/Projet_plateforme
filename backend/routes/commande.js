
import { commande_panier_controller } from "../controllers/commandeController.js";
import { Authentificate } from "../middleware/verif_token.js";

import { Router } from "express";


const commandeRoute = Router()


commandeRoute.post('/create_commande',Authentificate, commande_panier_controller)


export default commandeRoute;