
import { useEffect } from 'react'
import { useAuth } from '../context/authcontexte'
import { Link } from 'react-router-dom'
import './footer.css'


export default function Footer() {

    const {Get_categorie, listeCategorie} = useAuth()

    useEffect(()=> {
        Get_categorie()
    }, []) 

    return(
        <div>
            <div className='footer'>
                <div className="footer1">
                    <h1>AUTOPIECE</h1>
                    <p>Spécialiste pièces auto depuis 2008. Qualité garantie.</p>
                </div>
                <div className="footer2">
                    <h1>CATALOGUE</h1>
                    <ul>
                        {listeCategorie.map((cate)=> (
                            <li>
                                <Link to={`/catalogue/${cate.id_categorie}`}>
                                    {cate.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer3">
                    <h1>AIDE</h1>
                    <ul>
                        <li>Trouver ma pièce</li>
                        <li>Suivi commande</li>
                        <li>Retours</li>
                        <li>Garantie</li>
                    </ul>
                </div>
                <div className="footer4">
                    <h1>SOCIETE</h1>
                    <ul>
                        <li>A propos</li>
                        <li>Recrutement</li>
                        <li>CGV</li>
                        <li>Confidentialité</li>
                    </ul>
                </div>
                <div className="footer5">
                    <h1>NEWLETTERS</h1>
                    <input placeholder='email'/>
                </div>               
            </div>
            
            <div className="footer6">
                <h5>Autopiece SAS</h5>
            </div>
        </div>
    )
}