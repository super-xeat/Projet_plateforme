import { useAuth } from "../context/authcontexte"


export default function Profil() {

    const {profil} = useAuth()

    return(
        <div>
            <h1>votre profil</h1>
            <p>vous n'etes pas un admin</p>
            
            <li>
                <h2>votre nom : {profil.pseudo}</h2>
                <p>votre role : {profil.role}</p>
            </li>
        
        </div>
    )
}