import { useState } from "react"
import { useAuth } from "../context/authcontexte"
import AdminCreation from "../components/Admin/Admin_Creation"
import AdminGestion from "../components/Admin/Admin_Gestion"
import Admin_commande from "../components/Admin/Admin_commande"
import Admin_profil from "../components/Admin/Admin_profil"
import Admin_site from "../components/Admin/Admin_site"
import './Admin.css'


export default function Admin() {

    const {profil} = useAuth()
    const [Actifpage, setActifpage] = useState('profil')
    

    return (
        <div className="admin">
            <div className="sidebar">
                <div className="sidebar2">
                    <h1>votre profil admin</h1>
                    <h2>Bienvenue : {profil.pseudo}</h2>
                    
                    <hr />
                    
                    <div className="container">
                        <button onClick={()=>setActifpage('profil')}>Profil</button>
                        <button onClick={()=>setActifpage('commande')}>Gestion des Commande</button>
                        <button onClick={()=>setActifpage('creation')}>gestion création</button>
                        <button onClick={()=>setActifpage('site')}>gestion du site</button>
                    </div>
                </div>

                <button className="btn">retour au site</button>
            </div>
            
            <div className="navbar_admin">
                <h3>Admin/ {Actifpage}</h3>
            </div>

            {Actifpage === 'profil' && (
                <Admin_profil/>
            )}

            
            {Actifpage === 'creation' && (
                <AdminCreation/>
            )}

            
            {Actifpage === 'commande' && (
                <Admin_commande/>
            )}

            {Actifpage === 'site' && (
                <div>
                    <Admin_site/>
                </div>
            )}

        </div>
    )
}