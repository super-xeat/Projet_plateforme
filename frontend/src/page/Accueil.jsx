import './Accueil.css'
import { useAuth } from '../context/authcontexte'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function Accueil() {

    const {Get_categorie, listeCategorie, listeformulaire, setlisteformulaire} = useAuth()

    const [marque, setmarque] = useState('')
    const [model, setmodel] = useState('')
    const [vehicule, setvehicule] = useState('')
    const [annees, setannees] = useState('')

    const navigate = useNavigate()

    async function Formulaire(params) {
        try {
            const response = await fetch(`http://localhost:8000/api/product/recherche_product${params}`, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                console.log('data :', data)
                setlisteformulaire(data.result)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    async function handleformulaire(e) {
        e.preventDefault()
        let params = ''
        if (marque) {
            if (params === '') {
                params += `?marque=${marque}`
                setmarque('')
            } else {
                params += `&marque=${marque}`
                setmarque('')
            }
        } 
        if (model) {
            if (params === '') {
                params += `?model=${encodeURIComponent(marque)}`
                setmodel('')
            } else {
                params += `&model=${encodeURIComponent(marque)}`
                setmodel('')
            }
        }
        if (vehicule) {
            if (params === '') {
                params += `?vehicule=${encodeURIComponent(vehicule)}`
                setvehicule('')
            } else {
                params += `&vehicule=${encodeURIComponent(vehicule)}`
                setvehicule('')
            }
        }
        if (annees) {
            if (params === '') {
                params += `?annees=${annees}`
                setannees('')
            } else {
                params += `&annees=${annees}`
                setannees('')
            }
        }

        await Formulaire(params)
        params = ''
        navigate('/catalogue')
    }

    useEffect(()=> {
        Get_categorie()
    }, [])

    return(
        <div className="accueil">

            <div className='accueil_page1'>
            <div className="accueil1">
                <div className="accueil-titre1">
                    <p>pièce d'origine & performance</p>
                </div>
                <div className="accueil-titre2">
                    <h1>TOUTES LES</h1>
                    <h1>PIECE</h1>
                    <h1>DE VOTRE</h1>
                    <h1>VEHICULE</h1>
                </div>
                <div className="accueil-titre3">
                    <p>Des miliers de référence disponibles. Livraison express,
                        prix compétitifs, qualité garantie.
                    </p>
                </div>
                <div className="accueil-bouton">
                    <button className='accueil_btn1'>Parcourir le catalogue</button>
                    <button className='accueil_btn2'>chercher par véhicule</button>
                </div>
            </div>
            <div className="accueil2">
                
                <form onSubmit={handleformulaire} className='formulaire_accueil'>
                    <div className="titre-form">
                        Trouver par véhicule
                    </div>
                    <label htmlFor="">marque</label>
                    <input placeholder='entrez la marque' onChange={(e)=>setmarque(e.target.value)} value={marque}/>
                    
                    <label htmlFor="">model</label>
                    <input placeholder='entrez le model' onChange={(e)=>setmodel(e.target.value)} value={model}/>

                    <label htmlFor="">années</label>
                    <input placeholder='entrez une année' onChange={(e)=>setannees(e.target.value)} value={annees}/>
                    
                    <label htmlFor="">motorisation</label>
                    <input placeholder='entrez une motorisation' onChange={(e)=>setvehicule(e.target.value)} value={vehicule}/>
                        

                    <button type='submit'>Trouver les pièces compatibles</button>
                </form>
                
            </div>
            </div>
            <hr />
            <div className="accueil3">
                <div>
                    <h1 className='accueil3_titre'>Categorie</h1>
                    <Link to={'/catalogue/:id_catalogue'}>Voir tous</Link>
                </div>
                <div className='liste_categorie_accueil'>
                    {listeCategorie.map((categorie)=>(
                        <div key={categorie.id_categorie} className='categorie_card_accueil'
                            style={{ 
                                backgroundImage: `url(${categorie.image})`,
                            }}
                        >
                            <Link to={`/catalogue/${categorie.id_categorie}`} className='categorie_titre'>{categorie.name}</Link>          
                            
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}