
import { useState, useEffect } from "react"
import { useAuth } from "../context/authcontexte"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import './panier.css'
 

export default function Panier() {

    const {profil, loading} = useAuth()
    const [panier, setpanier] = useState([])
    
    const navigate = useNavigate()



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

    function decremente(id, quantityPanier) {
        setpanier(panier.map(produit => id === produit.id_product ? ({...produit, quantity: quantityPanier - 1}) : produit ) )
        
    }


    function Incremente(id, quantityPanier) {
        setpanier(panier.map(produit => id === produit.id_product ? ({...produit, quantity: quantityPanier + 1}) : produit) )

    }

    

    useEffect(()=> {
        
        if (loading) return

        if (!profil) {
            navigate('/login')
        } else {
            const userId = profil.userid
            Recup_panier(userId)
        } 
    }, [profil, loading])


    let result = panier.reduce((somme, item)=> somme + Number((item.quantity * item.price)), 0)
    
    
    return(
        <div className="panier">
            <h1 className="titre">Mon Panier</h1>
            <h2 className="nb_article"> {panier.length} articles</h2>
            <div className="panier1">
                <div className="panier2">
                    {panier.map(item => (
                        <div key={item.id_product} className="panier_card">
                            <div className="card_panier">
                                <img src={item.image} className="panier_image"/>
                                <div className="panier_card2">
                                    <Link to={`/product_card/${item.id_product}`} className="lien_product">{item.name}</Link>
                                    <div className="panier_button">
                                        <button className="btn1" onClick={()=>decremente(item.id_product, item.quantity)}>-</button>
                                        <p className="stock">{item.quantity}</p>
                                        <button className="btn2" onClick={()=>Incremente(item.id_product, item.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div>{item.price}</div>
                        </div>
                    ))}
                </div>
                <div className="formulaire">
                    <h1>recapitulatif</h1>
                    <hr />
                    <div className="formulaire2">
                        <div className="sous-total">
                            <h4>sous-total</h4>
                            <h4>{result}</h4>
                        </div>
                        <div className="livraison">
                            <h4>livraison</h4>
                            <h4>gratuite</h4>
                        </div>
                    </div>
                    <hr />
                    <div className="formulaire3">
                        <div className="total">
                            <h4>total TTC</h4>
                            <h4>{result}</h4>
                        </div>
                        <div className="btn-commande">
                            <button>Passez commande</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}