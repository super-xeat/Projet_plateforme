
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export default function Authprovider({children}) {

    const [profil, setprofil] = useState(null)
    const [listeCategorie, setlisteCategorie] = useState([])
    const [listemarque, setlistemarque] = useState([])

    const navigate = useNavigate()

    async function Login(email, password) {
        
        try {
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            })

            if (response.ok) {
                const data = await response.json()
                setprofil(data)
                console.log('profil :', profil)
                
                if (profil.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/profil')
                }
                
            }

        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function Get_categorie() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_categorie')
            if (response.ok) {
                const data = await response.json()
                setlisteCategorie(data.listeCategorie)
            }
        } catch (error) {
            console.log('erreur get_categorie :', error)
        }
    }

    async function Get_marque() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_marque')
            if (response.ok) {
                const data = await response.json()
                setlistemarque(data.listeMarque)
            }
        } catch (error) {
            console.log('erreur get_marque :', error)
        }
    }


    return(
        <authContext.Provider value={{
            Login, 
            profil, 
            Get_categorie,
            listeCategorie,
            Get_marque,
            listemarque  
            }}>
            {children}
        </authContext.Provider>
    )
}