
import { useState, useEffect } from "react"
import { useAuth } from "../context/authcontexte"
import { Link } from "react-router-dom"
import { useParams, useSearchParams } from "react-router-dom"
import { VscChevronRightCompact } from "react-icons/vsc";
import { VscChevronLeftCompact } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import './catalogue.css'


export default function Catalogue() {

    const [listeproduct, setlisteproduct] = useState([])
    const {Get_categorie, listeCategorie, Ajouter_Panier, profil, listeformulaire, setlisteformulaire} = useAuth()
    const [queryparams, setqueryparams] = useSearchParams()
    const [catechoisi, setcatechoisi] = useState(null)
    const [totalpage, settotalpage] = useState(0)

    const [recherche, setrecherche] = useState('')
    
    const page = parseInt(queryparams.get('page')) || 1
    

    async function Obtenir_product(id_categorie, page, recherche) {
        try {
            const response = await fetch(`http://localhost:8000/api/product/obtenir_product/${id_categorie}?valeur=${encodeURIComponent(recherche)}&page=${page}`, {
                method: 'GET'              
            })

            if (response.ok) {
                const data = await response.json()
                setlisteproduct(data.listeProduct)
                settotalpage(data.total)
                
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async function Obtenir_all(page, recherche) {
        try {
            const response = await fetch(`http://localhost:8000/api/product/obtenir_all?valeur=${encodeURIComponent(recherche)}&page=${page}`)
            if (response.ok) {
                const data = await response.json()
                setlisteproduct(data.productAll)
                settotalpage(data.total)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    useEffect(() => {
        Get_categorie()
    }, [])

    useEffect(() => {
        if (listeformulaire && listeformulaire.length > 0) return 
        if (catechoisi) Obtenir_product(catechoisi, page, recherche)
        else Obtenir_all(page, recherche)
    }, [page, catechoisi, listeformulaire, recherche])

    

    
    return(
        <div className="catalogue">
            <h1 className="piece">Toute les pièces</h1>
            <div className="recherche_catalogue">
                <form onSubmit={(e)=>e.preventDefault()} className="recherche_formulaire">
                    <input onChange={(e)=>{
                        setrecherche(e.target.value) 
                        setqueryparams({page: 1})
                    }} value={recherche} type="text" placeholder="Rechercher dans le catalogue"/>
                    <div className="search_btn">
                        <FaSearch color="grey"/>
                    </div>
                    
                </form>
            </div>

            <div className="categorie_catalogue">
                <button onClick={()=>{
                    setlisteformulaire(null)
                    setcatechoisi(null)
                    setqueryparams({page: 1})
                    
                    }} className="tous">Tous</button>
                {listeCategorie.map((categorie)=> (
                    <div className="categorie_card" key={categorie.id_categorie}>
                        
                        <button onClick={()=>{
                                setlisteformulaire(null)
                                setcatechoisi(categorie.id_categorie)  
                                setqueryparams({page: 1})                          
                                }}>
                            {categorie.name}
                        </button>
                    </div>
                ))}
            </div>

            <h1 className="resultat">résultats : {listeproduct.length} sur {totalpage}</h1>
 
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
                                <button onClick={()=>Ajouter_Panier(product.id_product, 1, profil.userid)} className="btn_ajouter">+ Panier</button>
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
                                    <div className="card_image_wrapper">
                                        <img src={product.image} className="card_image" alt={product.name} />
                                    </div>
                                    <h3 className="card_name">{product.product_name}</h3>
                                    
                                </div>
                            </Link> 
                            <div className="panier_btn">
                                <h2>{product.price} €</h2>
                                <button onClick={()=>Ajouter_Panier(product.id_product, 1, profil.userid)} className="btn_ajouter">+ Panier</button>
                            </div> 
                        </div>
                    ))}
                    
                </div>
            )}
            <div className="btn_pagination">
                <button onClick={()=>setqueryparams({page: page - 1})} className="diminu">
                    <VscChevronLeftCompact size={20}/>
                </button>
                <h2>page : {page}</h2>
                <button onClick={()=>setqueryparams({page: page + 1})} className="augmente">
                    <VscChevronRightCompact size={20}/>
                </button>
            </div>
        </div>
    )
}