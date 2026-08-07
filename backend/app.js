
import express from 'express'
import cors from 'cors'
import { db } from './database/config.js'
import routeUser from './routes/userRoute.js'
import routeAdmin from './routes/adminRoute.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', routeUser)
app.use('/api/admin', routeAdmin)


app.listen(8000, ()=> {
    console.log('serveur running')
})