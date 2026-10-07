
import { useState, useEffect } from "react"
import { useAuth } from "../../context/authcontexte"
import { FaTrashAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { VscChevronRightCompact } from "react-icons/vsc";
import { VscChevronLeftCompact } from "react-icons/vsc";
import './Admin_site.css'


export default function Admin_site() {

    const [products, setproducts] = useState([])
    const [mode, setmode] = useState('product')
    const [categorie, setcategorie] = useState('')
    const [listeuser, setlisteuser] = useState([])

    const {Get_categorie, listeCategorie} = useAuth()

    const [page, setpage] = useState(1)
    const [queryparams, setqueryparams] = useSearchParams()
    

    async function Produits(page) {

        try {
            const response = await fetch(`http://localhost:8000/api/admin/obtenir_prod?page=${page}`, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setproducts(data.products)
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
                Produits(page)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }
    
    async function Obtenir_user() {
        try {
            const response = await fetch('http://localhost:8000/api/user/obtenir_users', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setlisteuser(data.users)
            }

        } catch (error) {
            console.log('error', error)
        }
    }


    useEffect(()=> {
        const params_query = queryparams.get('page')
        if (!params_query) {
            setqueryparams({page: 1})
        }

        Produits(page)
        Get_categorie()
        Obtenir_user()
    }, [page])

    
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
                                <option value="">Tous les produits</option>
                                {listeCategorie?.map(cate => (
                                    <option value={cate.id_categorie} key={cate.id_categorie}>{cate.name}</option>
                                ))}    
                            </select>
                        </div>

                        <div>
                            {filtre && filtre.length > 0 && (
                            <table className="tableau_product">
                                <thead className="tableau">
                                    <tr>
                                        <th>produit</th>
                                
                                        <th>catégorie</th>
                                        <th>prix</th>
                                        <th>stock</th>
                                        <th>Supp</th>
                                    </tr>
                                </thead>

                                <tbody className="admin_container2">               
                                    {filtre.map((product)=> (
                                        <tr key={product.id_product}>
                                            
                                            <td>
                                                <div className="ligne1">
                                                    <img src={product.image} className="admin_image"/>
                                                    <h3>{product.name}</h3>
                                                </div> 
                                            </td>              
                                                                                                                                                                    
                                            <td>{catename?.name}</td>
                                            <td>{product?.price}</td>
                                            <td>{product?.stock}</td>                                                                                          
                                            <td>
                                                <div className="trash">
                                                    <button onClick={()=>Delete_product(Number(product.id_product))}>
                                                        <FaTrashAlt size={20}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="pagination">
                                                <button onClick={()=>
                                                    setpage(page - 1)                           
                                                    }>
                                                    <VscChevronLeftCompact size={20}/>
                                                </button>
                                                <h2>page {page} </h2>
                                                <button onClick={()=>
                                                    setpage(page + 1)                                  
                                                    }>
                                                    <VscChevronRightCompact size={20}/>
                                                </button>
                                            </div>
                                        </td>

                                        
                                    </tr>
                                </tfoot>

                            </table>

                        )}
                        </div>

                    </div>
                )}

                {mode === 'user' && (
                    <div>
                        <br />
                        <h2 className="user_h2">Liste des Users</h2>
                        <table>
                            <thead className="user_titre">
                                <tr>
                                    <th>Pseudo</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Adresse</th>
                                    <th>Email</th>
                                    <th>Supp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeuser.map((user)=> (
                                    <tr className="user_tableau" key={user.id_user}>
                                        <td>{user.pseudo}</td>
                                        <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                        <td>{user.adresse}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button>
                                                <FaTrashAlt size={26}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    )
}