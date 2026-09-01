
import { commandeController } from "../controllers/commandeController.js";
import { Router } from "express";


const commandeRoute = Router()


commandeRoute.post('/create_commande', commandeController)


export default commandeRoute;