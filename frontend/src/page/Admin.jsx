import { useState } from "react"
import { useAuth } from "../context/authcontexte"
import AdminCreation from "../components/Admin/Admin_Creation"
import AdminGestion from "../components/Admin/Admin_Gestion"
import Admin_commande from "../components/Admin/Admin_commande"
import Profil from "./profil"
import { Link } from "react-router-dom"
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
                        <button onClick={()=>setActifpage('profil')}>Profil & tableau de bord</button>
                        <button onClick={()=>setActifpage('commande')}>Gestion des Commande</button>
                        <button onClick={()=>setActifpage('creation')}>gestion création</button>
                        <button onClick={()=>setActifpage('site')}>gestion du site</button>
                    </div>
                </div>

                <button className="btn"><Link to={'/'}>retour au site</Link></button>
            </div>
            
            <div className="navbar_admin">
                <h3>Admin/ {Actifpage}</h3>
            </div>

            {Actifpage === 'profil' && (
                <Profil onmode={'admin'}/>
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