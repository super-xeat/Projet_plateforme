import { useState } from "react"
import { useAuth } from "../context/authcontexte"
import AdminCreation from "../components/Admin_Creation"

export default function Admin() {

    const {profil} = useAuth()
    const [Actifpage, setActifpage] = useState('profil')
    

    return (
        <div>
            <h1>votre profil admin</h1>
            <h2>Bienvenue : {profil.pseudo}</h2>
            
            <button onClick={()=>setActifpage('profil')}>Profil</button>
            <button onClick={()=>setActifpage('commande')}>Gestion des Commande</button>
            <button onClick={()=>setActifpage('creation')}>gestion création</button>
            <button onClick={()=>setActifpage('site')}>gestion du site</button>


            {Actifpage === 'profil' && (
                <div>
                    <h1>Votre profil</h1>
                </div>
            )}

            
            {Actifpage === 'creation' && (
                <AdminCreation/>
            )}

            
            {Actifpage === 'commande' && (
                <div>
                    <h1>Section des commande</h1>
                    
                </div>
            )}

            {Actifpage === 'site' && (
                <div>
                    <h1>gestion du site</h1>
                    <h3>supprimer des utilisateur, produit, ou données de votre bdd</h3>
                    
                </div>
            )}

        </div>
    )
}