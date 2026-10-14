
import { useState, useEffect } from "react"
import { useAuth } from "../context/authcontexte"
import { useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import './panier.css'
 

export default function Panier() {

    const {profil, loading} = useAuth()
    const [panier, setpanier] = useState([])
    
    const navigate = useNavigate()

    console.log('profil ', profil)
    async function Recup_panier(userId) {
        try {
            const response = await fetch(`http://localhost:8000/api/panier/obtenir_panier/${userId}`, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data) 
                if (data.panier.length === 0) {
                    navigate('/panier_vide')
                } else {
                    setpanier(data.panier)        
                    console.log('panier :', panier)     
                }              
            }

        } catch (error) {
            console.log('erreur dans recup_panier', error)
        }
    }

    const Create_commande = async() => {
        try {
            const response = await fetch('http://localhost:8000/api/commande/create_commande', {
                method: 'POST',
                credentials: 'include',
            }) 

            if (response.ok) {
                alert('commande envoyé')
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function delete_product(id_product, id_panier) {
        try {
            const response = await fetch(`http://localhost:8000/api/panier/delete_product/${id_product}/${id_panier}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                alert('produit supprimé du panier')
            }
        } catch (error) {
            console.log('erreur panier :', error)
        }
    }

    async function delete_all(id_panier) {
        try {
            const response = await fetch(`http://localhost:8000/api/panier/delete_all/${id_panier}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.ok) {
                alert('panier vidé')
            }
        } catch (error) {
            console.log('erreur', error)
        }
    }

    async function update_quantity(quantity, id_product, id_panier) {
        try {
            const response = await fetch(`http://localhost:8000/api/panier/update_quantity/${id_product}/${id_panier}`, { 
                method: 'PATCH',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    quantity: quantity
                })
        })
        if (response.ok) {
            console.log('update réussi')
        }
        } catch (error) {
            console.log('error :', error)
        }
    }

    function decremente(id, quantityPanier) {       
        const nouvelle = quantityPanier - 1
        if (nouvelle <= 0) {
            delete_product(id)           
        } else {
            setpanier(panier.map(p => p.id_product === id ? {...p, quantity: nouvelle} : p))
            update_quantity(nouvelle, id, panier[0].id_panier)
        }
    }

    function Incremente(id, quantityPanier) {
        setpanier(panier.map(produit => id === produit.id_product ? ({...produit, quantity: quantityPanier + 1}) : produit) )
        update_quantity(quantityPanier, id, panier[0].id_panier)
    }
    


    useEffect(()=> {
        
        if (loading) return

        if (!profil) {
            navigate('/login')
        } else {
            const userId = profil.id
            
            Recup_panier(userId)
        } 
    }, [profil, loading])


    let result = panier.reduce((somme, item)=> somme + Number((item.quantity * item.price).toFixed(2)), 0)
    
    
    
    return(
        <div className="panier">
            <div className="conteneur_panier">
                <div className="panier0">
                    <div className="conteneur_titre">
                        <h1 className="titre">Mon Panier</h1>
                        <h2 className="nb_article"> {panier.length} articles</h2>
                    </div>
                    <button className="btn_delete_all" onClick={()=>delete_all(panier[0].id_panier)}>
                        <p style={{paddingRight: '0.5rem', fontWeight: '600'}}>vider le panier</p>
                        <FaTrashAlt size={20}/>
                    </button>
                </div>

                
                <div className="panier1">
                    <div className="panier2">
                        {panier.map(item => (
                            <div key={item.id_product} className="panier_card">
                                <div className="card_panier">
                                    <img src={item.image} className="panier_image"/>
                                    <div className="panier_card2">
                                        <Link to={`/product_card/${item.id_product}`} className="lien_product">{item.name}</Link>
                                        <div className="btn_button">
                                            <div className="panier_button">
                                                <button className="btn1" onClick={()=>decremente(item.id_product, item.quantity)}>-</button>
                                                <p className="stock">{item.quantity}</p>
                                                <button className="btn2" onClick={()=>Incremente(item.id_product, item.quantity)}>+</button>
                                            </div>
                                            <button className="trash_btn" onClick={()=>delete_product(item.id_product, item.id_panier)}>
                                                <FaTrashAlt size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div>{item.price}</div>
                            </div>
                        ))}
                    </div>
                    <div className="formulaire">
                        <h1 className="form_titre">recapitulatif</h1>
                        <hr />
                        <div className="formulaire2">
                            <div className="sous-total">
                                <p>sous-total</p>
                                <p>{result}</p>
                            </div>
                            <div className="livraison">
                                <p>livraison</p>
                                <p>{result < 50 ? '4.90 euro': 'gratuite'}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="formulaire3">
                            <div className="total">
                                <p>Total TTC</p>
                                <p>{result}</p>
                            </div>
                            <div className="btn-commande">
                                <button onClick={()=>Create_commande()}>Passez commande</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}