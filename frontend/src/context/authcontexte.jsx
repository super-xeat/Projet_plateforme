
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export default function Authprovider({children}) {

    const [profil, setprofil] = useState(null)
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

    return(
        <authContext.Provider value={{Login, profil}}>
            {children}
        </authContext.Provider>
    )
}