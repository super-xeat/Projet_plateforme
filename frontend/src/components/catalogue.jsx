
import { useState, useEffect } from "react"
import Recherche from "./recherche"
import { useAuth } from "../context/authcontexte"
import ProductCard from "./product_card"
import { Link } from "react-router-dom"
import './catalogue.css'

export default function Catalogue() {

    const [listeproduct, setlisteproduct] = useState([])

    const {Get_categorie, listeCategorie} = useAuth()

    
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
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    useEffect(()=> {
        Get_categorie()
        Obtenir_all()
    }, [])

    return(
        <div className="catalogue">
            <h1>Toute les pièces</h1>
            <div className="recherche_catalogue">
                <Recherche/>
            </div>

            <div className="categorie_catalogue">
                <button onClick={()=>Obtenir_all()}>Tous</button>
                {listeCategorie.map((categorie)=> (
                    <div className="categorie_card" key={categorie.id_categorie}>
                        
                        <button onClick={()=>Obtenir_product(categorie.id_categorie)}>
                            {categorie.name}
                        </button>
                    </div>
                ))}
            </div>

            <p>{listeproduct.length}: résultats</p>

            <div className="listeproduct">
                {listeproduct?.map((product)=> (
                    <div key={product.id_product} className="product_card">
                        <Link to={`/product_card/${product.id_product}`} className="link">
                            <div className="product_card_link">
                                <img src={product.image} className="card_image" alt={product.name}/>
                                <h3>{product.name}</h3>
                                <p>{product.price} €</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            
        </div>
    )
}