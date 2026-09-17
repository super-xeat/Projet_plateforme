
import { useState, useEffect } from "react"
import { useAuth } from "../../context/authcontexte"
import { FaTrashAlt } from "react-icons/fa";
import './Admin_site.css'


export default function Admin_site() {

    const [products, setproducts] = useState([])
    const [mode, setmode] = useState('product')
    const [categorie, setcategorie] = useState('frein')
    
    const {Get_categorie, listeCategorie} = useAuth()

    async function Produits() {
        try {
            const response = await fetch('http://localhost:8000/api/product/obtenir_all', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setproducts(data.productAll)
            }

        } catch (error) {
            console.log('erreur :', error)
        }
    }

    async function Delete_product(product_id) {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/supprimer_produit/${product_id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                alert('produit supprimé')
                Produits()
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    useEffect(()=> {
        Produits()
        Get_categorie()
    }, [])

    
    const filtre = categorie ? products?.filter(product => product.id_categorie === Number(categorie)) : products
    const catename = listeCategorie?.find(cate => cate.id_categorie === Number(categorie))

    return(
        <div className="product_admin_site">
                <div className="btn_admin">
                    <button onClick={()=>setmode('product')} style={{
                            color: mode === 'product' ? 'white' : 'grey'
                        }}>Produits</button>

                    <button onClick={()=>setmode('user')} style={{
                            color: mode === 'user' ? 'white' : 'grey'
                        }}>User</button>
                </div>
                {mode === 'product' && (
                    <div>
                        <div className="cate_container">
                            <h1>Liste de vos produits</h1>
                            <select onChange={(e)=>{setcategorie(e.target.value)}} value={categorie}>
                                {listeCategorie?.map(cate => (
                                    <option value={cate.id_categorie} key={cate.id_categorie}>{cate.name}</option>
                                ))}    
                            </select>
                        </div>

                        <div className="admin_site_container">
                            {filtre && filtre.length > 0 && (
                            <div>
                                <div className="tableau">
                                    <div className="tableau1">
                                        <h4>produit</h4>
                                    </div>
                                    <div className="tableau2">
                                        <h4>catégorie</h4>
                                        <h4>prix</h4>
                                        <h4>stock</h4>
                                    </div>
                                </div>

                                <div className="admin_container2">               
                                    {filtre.map((product)=> (
                                        <div className="product_filtre">
                                            <div className="product_filtre1">
                                                <img src={product.image} className="admin_image"/>               
                                                <h3 className="admin_product_name">{product.name}</h3>
                                            
                                            </div>

                                            <div className="product_filtre2">
                                                <h3 className="admin_product_cate">{catename.name}</h3>
                                                <h3 className="admin_product_price">{product.price}</h3>
                                                <h3 className="admin_product_stock">{product.stock}</h3>
                                                
                                            </div>
                                            <div className="trash">
                                                <button onClick={()=>Delete_product(Number(product.id_product))}>
                                                    <FaTrashAlt size={26}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        )}
                        </div>

                    </div>
                )}

                {mode === 'user' && (
                    <div>
                        <h1>mode user</h1>
                    </div>
                )}
        </div>
    )
}