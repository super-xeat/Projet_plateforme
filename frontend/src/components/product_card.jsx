
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './product_card.css'


export default function ProductCard() {

    const [product, setproduct] = useState([])
    const [mode, setmode] = useState('description')
    const [chiffre, setchiffre] = useState(0)
    const {id_product} = useParams()

    async function ProductCard_detail(id_product) {
        try {
            const response = await fetch(`http://localhost:8000/api/product/obtenir_product_card/${id_product}`, {
                method: 'GET'
            })

            if (response.ok) {
                const data = await response.json()
                setproduct(data.listeproductcard[0])
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    useEffect(()=> {
        ProductCard_detail(id_product)
    }, [id_product])

    return(
        <div className="Product_card">
            <h2>Detail du produit</h2>
            <br />
            <hr />
            <br />
            <div>                 
                {product && (
                    <div className="product">
                        <img src={product.image} className="image_product"/>
                        <div className="container_product"> 
                            <h2 className="name">{product.name}</h2>
                            <h1 className="price">{product.price} euro</h1>
                             
                            <h5>Plus que {product.stock} en stock</h5>
                            <div className="container_product">
                                
                                <div className="container_product2">
                                    <div className="stock_selector">
                                        <button onClick={()=>setchiffre(chiffre - 1)}>-</button>
                                        <span>{chiffre}</span>
                                        <button onClick={()=>setchiffre(chiffre + 1)}>+</button>
                                    </div>

                                    <button className="btn_panier">Ajouter au panier</button>
                                </div>               
                            </div>
                            
                            <button className="voir_panier">voir le panier</button>
                        </div>
                        
                    </div>
                )}            
            </div>

            <br /><br /><br /><br />

            <div className="button_mode">
                {mode === 'description' ? (
                    <button onClick={()=>setmode('description')} style={{
                        color: 'white'
                    }}>Description</button>
                ) : (
                    <button onClick={()=>setmode('description')}>Description</button>
                )}

                {mode === 'info' ? (
                    <button onClick={()=>setmode('info')} style={{
                        color: 'white'
                    }}>Info</button>
                ) : (
                    <button onClick={()=>setmode('info')}>Info</button>
                )}
                <button onClick={()=>setmode('livraison')}>Livraison</button>           
            </div>

            <br />
            <br />
            {mode === 'description' && (
                <div>
                    {product.description}
                </div> 
                
            )}

            {mode === 'info' && (
                <div className="info">
                    <p>Livraison gratuite dès 50 euro d'achat</p>
                    <p>Garantie 2 ans</p>
                    <p>Retour gratuit sous 30 jours</p>
                </div>
            )}
        </div>
    )
}