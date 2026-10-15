import { useAuth } from "../context/authcontexte"
import { useState, useEffect } from "react"
import './profil.css'



export default function Profil({onmode}) {

    const {profil} = useAuth()
    const [mode, setmode] = useState('profil')
    const [userprofil, setuserprofil] = useState({})
    const [modeadmin, setmodeadmin] = useState('profil_admin')

    const [nbcommande, setnbcommande] = useState(null)
    const [stock, setstock] = useState(null)
    const [chiffre, setchiffre] = useState(null)
    const [prodstock, setprodstock] = useState([])

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

    async function nb_commande() {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/nb_commande`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setnbcommande(data.nb_commande)
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function chiffre_affaire() {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/chiffre_affaire`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setchiffre(data.chiffre_affaire)
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function stock_critique() {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/stock_critique`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setstock(data.stock_critique)
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function nb_listeproduct() {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/product_critique_liste`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setprodstock(data.liste_product_critique)
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
        
        if (profil?.id) {
            recup_profil(profil.id)
        }

        if (onmode === 'admin') {
            nb_commande()
            nb_listeproduct()
            stock_critique()
            chiffre_affaire()
        }
    }, [])
    
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
                    <h1 className="profil_title_admin">{userprofil.pseudo ?? profil.pseudo}</h1>
                    <h2 className="profil_title_admin2">{userprofil.email ?? profil.email}</h2>
                    
                    <div className="btn_profil_selection">
                        <button onClick={()=>setmodeadmin('profil_admin')} style={{
                            color : modeadmin === 'profil_admin' ? 'white' : 'grey'
                        }}>Profil</button>
                        <button onClick={()=>setmodeadmin('statistique')} style={{
                            color : modeadmin === 'statistique' ? 'white' : 'grey'
                        }}>Statistique</button>                   
                    </div>

                    {modeadmin === 'profil_admin' && (
                        
                        <form onSubmit={Handlesubmit} className="formulaire_profil_admin">
                            <br /><br />
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
                        <div>
                            <div className="stat1">
                                    <h2>Tableau de bord</h2>
                                <div>
                                    <div>{nbcommande}</div>
                                    <p>commande passé</p>
                                </div>
                                <div>
                                    <h1>{stock}</h1>
                                    <p>stock produit inférieur à 5</p>
                                </div>
                                <div>
                                    <h1>{chiffre}</h1>
                                    <p>chiffre d'affaire</p>
                                </div>
                            </div>

                            <div className="stat2">
                                <table>
                                    <thead className="stat2_tableau">
                                        <tr>
                                            <th>Produit</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prodstock?.map((prod)=> (
                                            <tr key={prod.id_product}>
                                                <td>
                                                    <img src={prod.image} className="stat2_image"/>
                                                    <h3>{prod.name}</h3>
                                                </td>
                                                <td>{prod.stock}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}