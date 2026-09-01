import { useAuth } from "../context/authcontexte"
import { useState } from "react"
import './profil.css'



export default function Profil() {

    const {profil} = useAuth()
    const [mode, setmode] = useState('profil')


    return(
        <div>
            <button onClick={()=>setmode('profil')}>profil</button>
            <button onClick={()=>setmode('commande')}>profil</button>
            <button onClick={()=>setmode('adresse')}>profil</button>
            
            {mode === 'profil' && (
                <div>
                    <h3>Mon compte</h3>
                    <h1>{profil.pseudo}</h1>
                    <h6>{profil.email}</h6>
                </div>
            )}
        </div>
    )
}