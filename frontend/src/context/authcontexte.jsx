
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
    const [listemodel, setlistemodel] = useState([])
    const [listeannees, setlisteannees] = useState([])
    const [listeVehicule, setlisteVehicule] = useState([])

    const navigate = useNavigate()

    async function refresh() {
        try {
            const response = await fetch('http://localhost:8000/api/me', {
                credentials:'include'
            })
            if (response.ok) {
                const data = await response.json()
                setprofil(data.user)
                console.log('vous etes reconnecté')
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    useEffect(()=> {
        refresh()
    }, [])

    async function Login(email, password) {
        
        try {
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                credentials: 'include',
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
            const response = await fetch('http://localhost:8000/api/product/obtenir_categorie', {
                method: 'GET',
                credentials: 'include'
            })
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
            const response = await fetch('http://localhost:8000/api/product/obtenir_marque', {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setlistemarque(data.listeMarque)
            }
        } catch (error) {
            console.log('erreur get_marque :', error)
        }
    }

    async function Get_model() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_model', {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setlistemodel(data.listeModel)
            }
        } catch (error) {
            console.log('erreur get_marque :', error)
        }
    }

    async function Get_annees() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_annees', {
                method: 'GET',
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                setlisteannees(data.listeAnnees)
            }
        } catch (error) {
            console.log('erreur get_marque :', error)
        }
    }

    async function Get_vehicule() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_vehicule', {
                method: 'GET',
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                setlisteVehicule(data.listeVehicule)
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
            listemarque,
            Get_model,
            listemodel,
            Get_annees,
            listeannees,
            Get_vehicule,
            listeVehicule
            }}>
            {children}
        </authContext.Provider>
    )
}