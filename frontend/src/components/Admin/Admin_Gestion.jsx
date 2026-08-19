
import { useEffect } from "react";
import { useAuth } from "../../context/authcontexte";
import { useState } from "react";


export default function AdminGestion() {

    const {Get_categorie, listeCategorie} = useAuth()

    const [idgeneral, setidgenerale] = useState('')
    const [toggle, settoggle] = useState(false)

    const [valeur1, setvaleur1] = useState('')
    const [valeur2, setvaleur2] = useState('')


    useEffect(()=> {
        Get_categorie()
    }, [])

    async function Delete_categorie(idcategorie) {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/delete_categorie/${idcategorie}`, {
                method: 'delete',
                credentials: 'include'
            })
            if (response.ok) {
                alert('element supprimé')
                Get_categorie()
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    function Transition(param1, param2) {
        settoggle(true)
        setvaleur1(param1)
        setvaleur2(param2)
    }

    function Handlesubmit(valeur1, valeur2) {
        if (valeur2 === 'categorie') {
            Delete_categorie(idgeneral)
        }
        settoggle(false)
        setvaleur1('')
        setvaleur2('')
        setidgenerale('')
    }

    return(
        <div>
            <h2>Section suppression</h2>
            <select onChange={(e)=> {
                const cate = listeCategorie.find(cat => cat.id_categorie === Number(e.target.value))
                setidgenerale(e.target.value)
                Transition(cate.name, 'categorie')
                }} value={idgeneral}>
                {listeCategorie.map((categorie)=> (
                    <option key={categorie.id_categorie} value={categorie.id_categorie}>
                        {categorie.name}
                    </option>
                ))}
            </select>

            {toggle && (
                <div>
                    <h2>Etes vous sur de vouloir supprimé {valeur1} de {valeur2}</h2>
                    <button onClick={()=>Handlesubmit(valeur1, valeur2)}>YES</button>   
                    <button>NO</button>
                </div>
            )}
        </div>
    )
}