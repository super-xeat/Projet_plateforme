import { useState } from "react"
import { useAuth } from "../context/authcontexte"
import AdminCreation from "../components/Admin/Admin_Creation"
import Admin_commande from "../components/Admin/Admin_commande"
import Profil from "./profil"
import { Link } from "react-router-dom"
import Admin_site from "../components/Admin/Admin_site"
import './Admin.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { GoListOrdered } from "react-icons/go";
import { IoIosCreate } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";


export default function Admin() {

    const {profil} = useAuth()
    const [Actifpage, setActifpage] = useState('profil')
    

    return (
        <div className="admin">
            <div className="sidebar">
                <div className="sidebar2">
                    <h1><strong>Auto</strong>piece</h1>
                    <p>panel admin</p>
                    
                    <hr />
                    
                    <div className="container">
                        <button onClick={()=>setActifpage('profil')}>
                            <LuLayoutDashboard size={25} className="btn_admin1"/>
                            Profil & tableau de bord
                        </button>
                        <button onClick={()=>setActifpage('commande')}>
                            <GoListOrdered size={25} className="btn_admin1"/>
                            Gestion des Commande
                        </button>
                        <button onClick={()=>setActifpage('creation')}>
                            <IoIosCreate size={25} className="btn_admin1"/>
                            gestion création
                        </button>
                        <button onClick={()=>setActifpage('site')}>
                            <RiComputerLine size={25} className="btn_admin1"/>
                            gestion du site
                        </button>
                    </div>
                </div>

                <button className="btn">
                    <Link to={'/'} className="retour_site">retour au site</Link>
                </button>
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