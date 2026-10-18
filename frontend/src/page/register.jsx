import { useState, useEffect } from "react";
import './register.css'

export default function Register() {

    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        adresse: "",
        pseudo: ""
    })

    async function Inscription() {

        try {
            const response = await fetch(`http://localhost:8000/api/user/register`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(user)
            })
            
            if (response.ok) {
                console.log('ok user créer')
            }

        } catch (error) {
            console.log('erreur :', error)
        }
    }

    const handleUser = (e) => {       
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        Inscription(user)
        
    } 
    return (
        <div className="register">
            <div className="register1">
                <form onSubmit={handlesubmit} className="form_register">
                
                    <div className="nom_prenom">
                        <input onChange={handleUser} value={user.nom} type="text" name="nom" placeholder="nom"/>
                        <input onChange={handleUser} value={user.prenom} type="text" name="prenom" placeholder="prenom"/>
                    </div>
                    <input onChange={handleUser} value={user.email} type="email" name="email" placeholder="email"/>
                    <input onChange={handleUser} value={user.mot_de_passe} type="password" name="mot_de_passe" placeholder="password"/>
                    <input onChange={handleUser} value={user.adresse} type="text" name="adresse" placeholder="adresse"/>
                    <input onChange={handleUser} value={user.pseudo} type="text" name="pseudo" placeholder="pseudo"/>

                    <div className="btn_register">
                        <button type="submit">envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}