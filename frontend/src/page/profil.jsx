import { useAuth } from "../context/authcontexte"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { VscChevronRightCompact } from "react-icons/vsc";
import { VscChevronLeftCompact } from "react-icons/vsc";
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
    const [useparam, setuseparam] = useSearchParams()

    const [cours, setcours] = useState(null)
    const [passer, setpasser] = useState(null)

    const [ouvert, setouvert] = useState(null)
    const [idorder, setidorder] = useState(null)

    const page = parseInt(useparam.get('page')) || 1

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

    async function nb_listeproduct(page) {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/product_critique_liste?page=${page}`, {
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

    async function commande_cours() {
        try {
            const response = await fetch('http://localhost:8000/api/commande/commande_cours', {
                method: 'GET',
                credentials:'include'
            })
            if (response.ok) {
                const data = await response.json()
                setcours(data.commande_cours)
                
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function commande_passer() {
        try {
            const response = await fetch('http://localhost:8000/api/commande/commande_passer', {
                method: 'GET',
                credentials:'include'
            })
            if (response.ok) {
                const data = await response.json()
                setpasser(data.commande_passer)
                
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

    useEffect(() => {
        if (profil?.id) recup_profil(profil.id)
    }, [profil?.id])

    useEffect(() => {
        if (onmode === 'client') {
            commande_cours()
            commande_passer()
        }
    }, [onmode])

    useEffect(() => {
        if (onmode === 'admin') {
            nb_commande()
            stock_critique()
            chiffre_affaire()
        }
    }, [onmode])

    useEffect(() => {
        if (onmode === 'admin') nb_listeproduct(page)
    }, [onmode, page])

    const commandefiltre = cours?.find(product => product.id_commande === idorder)
    const commandefiltre2 = passer?.find(product => product.id_commande === idorder)
        
    return(
        <div>
            
            {onmode === 'client' && (
                <div className="component_profil">
                <div className="component_client">
                    <h3 className="profil_title1">---- Mon compte</h3>
                    <h3 className="profil_title2">{userprofil.pseudo ?? profil?.pseudo}</h3>
                    <p className="profil_title3">{userprofil.email ?? profil?.email}</p>

                    <div className="client_profil">
                        <button onClick={()=>{setmode('profil'), setouvert(null), setidorder(null)}}>profil</button>
                        <button onClick={()=>{setmode('commande passé'), setouvert(null), setidorder(null)}}>commande passé</button>
                        <button onClick={()=>{setmode('en cours'), setouvert(null), setidorder(null)}}>commande en cours</button>
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
                    </div>

                    {mode === 'commande passé' && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Adresse de livraison</th>
                                        <th>Total</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passer?.map(commande => (
                                        <tr key={commande.id_commande}>
                                            <td>{commande.date}</td>
                                            <td>{commande.adresse_livraison}</td>
                                            <td>{commande.montant_total}</td>
                                            <td>{commande.statut}</td>
                                            <td>
                                                <button onClick={()=>{
                                                    setouvert('ouvert'), 
                                                    setidorder(commande.id_commande)}}
                                                    >Voir produits
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                {ouvert === 'ouvert' && (
                                    <div className="commandefiltre">
                                        {commandefiltre2?.listeproduct?.map((prod, index) => (
                                            <div key={index} className="commandefiltre_prod">
                                                <div className="comfiltre1">
                                                    <div className="image_wrap">
                                                        <img src={prod.image} className="image_commande"/>
                                                    </div>
                                                    <p className="commandefiltre_title">{prod.name}</p>                          
                                                </div>
                                                
                                                <p className="commandefiltre_quantity">x {prod.quantity}</p>
                                                <p className="commandefiltre_price">{prod.price}e</p>
                                            </div>
                                        ))}
                                        <button onClick={()=>{setidorder(null), setouvert(null)}} className="commandefiltre_btn">fermé</button>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    )}

                    {mode === 'en cours' && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Adresse de livraison</th>
                                        <th>Total</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cours?.map(commande => (
                                        <tr key={commande.id_commande}>
                                            <td>{commande.date}</td>
                                            <td>{commande.adresse_livraison}</td>
                                            <td>{commande.montant_total}</td>
                                            <td>{commande.statut}</td>
                                            <td>
                                                <button onClick={()=>{
                                                    setouvert('ouvert'), 
                                                    setidorder(commande.id_commande)}}
                                                    >Voir produits
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div>
                                {ouvert === 'ouvert' && (
                                    <div className="commandefiltre">
                                        {commandefiltre?.listeproduct?.map((prod, index) => (
                                            <div key={index} className="commandefiltre_prod">
                                                <div className="comfiltre1">
                                                    <div className="image_wrap">
                                                        <img src={prod.image} className="image_commande"/>
                                                    </div>
                                                    <p className="commandefiltre_title">{prod.name}</p>                          
                                                </div>

                                                <p className="commandefiltre_quantity">x {prod.quantity}</p>
                                                <p className="commandefiltre_price">{prod.price}e</p>
                                            </div>
                                        ))}
                                        <button onClick={()=>{setidorder(null), setouvert(null)}} className="commandefiltre_btn">fermé</button>
                                    </div>
                                )}
                                
                            </div>
                        </div>
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
                                
                                <div className="bull_stat">
                                    <div>
                                        <h1>{nbcommande}</h1>
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
                            </div>

                            <div className="stat2">
                                <table>
                                    <thead className="stat2_tableau">
                                        <tr>
                                            <th>Produit inférieur à 5</th>
                                            <th>Stock</th>
                                            <th>Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prodstock?.map((prod)=> (
                                            <tr key={prod.id_product} className="stat2_body">
                                                <td>
                                                   <div className="product_table">
                                                        <div className="image_wrap">
                                                            <img src={prod.image} className="stat2_image"/>
                                                        </div>
                                                        <h3>{prod.name}</h3>
                                                   </div>
                                                </td>
                                                <td>{prod.stock}</td>
                                                <td>{prod.price}</td>
                                            </tr>
                                        ))}
                                    </tbody> 
                                    <tfoot>
                                        <tr>
                                            <td>
                                                <div className="pagination_stock">
                                                    <button disabled={page <= 1} onClick={() => setuseparam({ page: page - 1 })} className="btn_stats">
                                                        <VscChevronLeftCompact color="white" size={20}/>
                                                    </button>
                                                    <div className="stat_page">
                                                        <p>page : {page} sur {stock}</p>
                                                    </div>
                                                    <button disabled={page >= stock} onClick={() => setuseparam({ page: page + 1 })} className="btn_stats">
                                                        <VscChevronRightCompact color="white" size={20}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
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