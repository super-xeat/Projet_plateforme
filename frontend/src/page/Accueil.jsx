import './Accueil.css'
import { useAuth } from '../context/authcontexte'
import { useEffect } from 'react'

export default function Accueil() {

    const {Get_categorie, listeCategorie} = useAuth()

    useEffect(()=> {
        Get_categorie()
    }, [])

    return(
        <div className="accueil">

            <div className='accueil_page1'>
            <div className="accuei1">
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
                    <button>Parcourir le catalogue</button>
                    <button>chercher par véhicule</button>
                </div>
            </div>+
            <div className="accueil2">
                <div className="accueil22">
                    <div className="titre-form">
                        trouver par véhicule
                    </div>
                    <form action="" className='formulaire'>
                        <label htmlFor="">marque</label>
                        <input placeholder='entrez la marque'/>
                        
                        <label htmlFor="">model</label>
                        <input placeholder='entrez le model'/>

                        <label htmlFor="">années</label>
                        <input placeholder='entrez une année'/>
                        
                        <label htmlFor="">motorisation</label>
                        <input placeholder='entrez une motorisation'/>
                         

                        <button>Trouver les pièces compatibles</button>
                    </form>
                </div>
            </div>
            </div>
            <div className="accueil3">
                <h1>Categorie</h1>

                <div>
                    {listeCategorie.map((categorie)=>(
                        <div key={categorie.id_categorie}>
                            {categorie.name}
                            
                            <img src={categorie.image}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}