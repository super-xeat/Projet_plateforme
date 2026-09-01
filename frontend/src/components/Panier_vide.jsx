
import { Link } from "react-router-dom"

export default function Panier_vide() {

    return(
        <div>
            <h1>Votre panier est vide</h1>
            <Link to={'/catalogue'}>Retourner au catalogue</Link>
        </div>
    )
}