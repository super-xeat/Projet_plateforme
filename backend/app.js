
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { db } from './database/config.js'
import routeUser from './routes/userRoute.js'
import routeAdmin from './routes/adminRoute.js'
import routeProduct from './routes/productRoute.js'
import panierRoute from './routes/panierRoute.js';
import commandeRoute from './routes/commande.js';
import { Authentificate } from './middleware/verif_token.js';

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/user', routeUser)
app.use('/api/admin', routeAdmin)
app.use('/api/product', routeProduct)
app.use('/api/panier', panierRoute)
app.use('/api/commande', commandeRoute)

app.get('/api/me', Authentificate, function Persistance(req, res) {
    console.log('user app :', req.user)

    return res.status(200).json({
        'user': req.user
    })
})

app.listen(8000, ()=> {
    console.log('serveur running')
})