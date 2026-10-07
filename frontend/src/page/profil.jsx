import { useAuth } from "../context/authcontexte"
import { useState, useEffect } from "react"
import './profil.css'



export default function Profil({onmode}) {

    const {profil} = useAuth()
    const [mode, setmode] = useState('profil')
    const [userprofil, setuserprofil] = useState({})
    const [modeadmin, setmodeadmin] = useState('profil_admin')

    const [user, setuser] = useState({})
    
    async function recup_profil(id_user) {
        
        try {
            const response = await fetch(`http://localhost:8000/api/user/obtenir_user/${id_user}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                console.log('data', data)
                setuserprofil(data.user)
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function update_profil(id_user) {
        try {
            const response = await fetch(`http://localhost:8000/api/user/update_profil/${id_user}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(user)
            })

            if(response.ok) {
                alert('user modifié')
            }

        } catch (error) {
            console.log('erreur :', error)
        }
    }

    function Handlechange(e) {       
        setuser({...user, [e.target.name]: e.target.value})       
    }

    function Handlesubmit(e) {
        e.preventDefault()
        if (profil.id) {
            update_profil(profil.id)
            recup_profil(profil.id)
        }
    }

    useEffect(()=> {
        console.log('profil.userid :', profil.id)
        if (profil?.id) {
            recup_profil(profil.id)
        }
    }, [])

    console.log('userprofil :', userprofil)
    console.log('onmode :', onmode)
    return(
        <div>
            
            {onmode === 'client' && (
                <div className="component_profil">
                <div className="component_client">
                    <h3 className="profil_title1">---- Mon compte</h3>
                    <h3 className="profil_title2">{profil.pseudo}</h3>
                    <p className="profil_title3">{profil.email}</p>

                    <button onClick={()=>setmode('profil')}>profil</button>
                    <button onClick={()=>setmode('commande passé')}>commande passé</button>
                    <button onClick={()=>setmode('en cours')}>commande en cours</button>
                    <div className="barre_profil"></div>
                    {mode === 'profil' && (
                        <div className="profil_client">
                            
                            <form onSubmit={Handlesubmit} className="formulaire_profil">
                                <span>nom</span>
                                <input onChange={Handlechange} value={user.nom ?? userprofil.nom ?? ''} name="nom" type="text"/>
                                <span>prénom</span>
                                <input onChange={Handlechange} value={user.prenom ?? userprofil.prenom ?? ''} name="prenom" type="text"/>
                                <span>email</span>
                                <input onChange={Handlechange} value={user.email ?? userprofil.email ?? ''} name="email" type="text"/>
                                <span>adresse</span>
                                <input onChange={Handlechange} value={user.adresse ?? userprofil.adresse ?? ''} name="adresse" type="text"/>
                                <span>pseudo</span>
                                <input onChange={Handlechange} value={user.pseudo ?? userprofil.pseudo ?? ''} name="pseudo" type="text" />
                                <button type="submit">Enregistrer les modifications</button>
                            </form>
                        </div>
                    )}

                    {mode === 'commande passé' && (
                        <div></div>
                    )}
                </div>
                </div>
            )}

            {onmode === 'admin' && (
                <div className="component_admin">
                    <h1>{profil.pseudo}</h1>
                    <h2>{profil.email}</h2>
                    
                    <button onClick={()=>setmodeadmin('profil_admin')}>Profil</button>
                    <button onClick={()=>setmodeadmin('statistique')}>Statistique</button>
                    
                    {modeadmin === 'profil_admin' && (
                        <form onSubmit={Handlesubmit} className="formulaire_profil_admin">
                            <span>nom</span>
                            <input onChange={Handlechange} value={user.nom ?? userprofil.nom ?? ''} name="nom" type="text"/>
                            <span>prénom</span>
                            <input onChange={Handlechange} value={user.prenom ?? userprofil.prenom ?? ''} name="prenom" type="text"/>
                            <span>email</span>
                            <input onChange={Handlechange} value={user.email ?? userprofil.email ?? ''} name="email" type="text"/>
                            <span>pseudo</span>
                            <input onChange={Handlechange} value={user.pseudo ?? userprofil.pseudo ?? ''} name="pseudo" type="text" />
                            <button type="submit">Enregistrer les modifications</button>
                        </form>
                    )}

                    {modeadmin === 'statistique' && (
                        <h1>Tableau de bord</h1>
                    )}
                </div>
            )}
        </div>
    )
}