
import { useState, useEffect } from "react"
import Recherche from "./recherche"
import { useAuth } from "../context/authcontexte"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import './catalogue.css'


export default function Catalogue() {

    const [listeproduct, setlisteproduct] = useState([])
    const {Get_categorie, listeCategorie, Ajouter_Panier, profil, listeformulaire, setlisteformulaire} = useAuth()

    const {id_categorie} = useParams()
    
    console.log('formulaire :', listeformulaire)
    async function Obtenir_product(id_categorie) {
        try {
            const response = await fetch(`http://localhost:8000/api/product/obtenir_product/${id_categorie}`, {
                method: 'GET'              
            })

            if (response.ok) {
                const data = await response.json()
                setlisteproduct(data.listeProduct)
                
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async function Obtenir_all() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_all')
            if (response.ok) {
                const data = await response.json()
                setlisteproduct(data.productAll)
                setlisteformulaire(null)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    useEffect(()=> {
        Get_categorie()
        if (!listeformulaire || listeformulaire.length === 0) {
        Obtenir_all()
        }
    }, [])

    return(
        <div className="catalogue">
            <h1 className="piece">Toute les pièces</h1>
            <div className="recherche_catalogue">
                <Recherche/>
            </div>

            <div className="categorie_catalogue">
                <button onClick={()=>{
                    setlisteformulaire(null)
                    Obtenir_all()
                    }} className="tous">Tous</button>
                {listeCategorie.map((categorie)=> (
                    <div className="categorie_card" key={categorie.id_categorie}>
                        
                        <button onClick={()=>{
                                setlisteformulaire(null)
                                Obtenir_product(categorie.id_categorie)                              
                                }}>
                            {categorie.name}
                        </button>
                    </div>
                ))}
            </div>

            <p>{listeproduct.length}: résultats</p>
 
            {listeformulaire && listeformulaire.length > 0 ? (
                <div className="listeproduct">
                    {listeformulaire?.map((product)=> (
                        <div key={product.id_product} className="product_card">
                            <Link to={`/product_card/${product.id_product}`} className="link">
                                <div className="product_card_link">
                                    <img src={product.image} className="card_image" alt={product.name}/> 
                                    <h3 className="card_name">{product.name}</h3>
                                </div>
                            </Link>
                            <div className="panier_btn">
                                <h2>{product.price} €</h2>
                                <button onClick={()=>Ajouter_Panier(product.id_product, 1, profil.userid)} className="btn_ajouter">Panier</button>
                            </div> 
                        </div>
                    ))}
                </div>
            ) : (
                <div className="listeproduct">
                    {listeproduct?.map((product)=> (
                        <div key={product.id_product} className="product_card">
                            <Link to={`/product_card/${product.id_product}`} className="link">
                                <div className="product_card_link">
                                    <img src={product.image} className="card_image" alt={product.name}/> 
                                    <h3 className="card_name">{product.name}</h3>
                                </div>
                            </Link>
                            <div className="panier_btn">
                                <h2>{product.price} €</h2>
                                <button onClick={()=>Ajouter_Panier(product.id_product, 1, profil.userid)} className="btn_ajouter">Panier</button>
                            </div> 
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}