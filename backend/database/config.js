import mysql from 'mysql2/promise'


export const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'newuser',
    password: 'Tomfeu83',
    database: 'projet_plateforme',
    port: '3306'
})

