
import { useEffect } from "react";
import { useAuth } from "../context/authcontexte";


export default function AdminGestion() {

    const {Get_categorie, listeCategorie} = useAuth()

    useEffect(()=> {
        Get_categorie()
    }, [])

    return(
        <div>
            {listeCategorie?.map((char)=> (
                <li key={char.id_categorie}>
                    {char.name}
                </li>
            ))}
        </div>
    )
}