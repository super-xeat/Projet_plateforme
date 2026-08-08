import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontexte";


export default function AdminCreation() {

    
    const [categorie, setcategorie] = useState('')
    const [annees, setannees] = useState('')
    const [marque, setmarque] = useState('')
    const [model, setmodel] = useState('')

    const [idmarque, setidmarque] = useState('')

    const {Get_marque, listemarque  } = useAuth()

    useEffect(()=> {
        Get_marque()
    }, [])

    async function Creation_annees(annees) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_annees', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    annees: annees
                })
            })

            if (response.ok) {
                alert('nouvelle annees créer')
            }
        } catch (error) {
            console.error('error :', error)
        }
    }

    async function Creation_categorie(categorie) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_cate', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    categorie: categorie
                })
            })

            if (response.ok) {
                alert('nouvelle categorie créer')
            }
        } catch (error) {
            console.error('error :', error)
        }
    }

    async function Creation_marque(marque) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_marque', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    marque: marque
                })
            })

            if (response.ok) {
                alert('nouvelle marque créer')
            }
        } catch (error) {
            console.error('error :', error)
        }
    }

    async function Creation_model(model, idmarque) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_model', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    model: model,
                    id_marque: idmarque
                })
            })

            if (response.ok) {
                alert('nouveau model créer')
            }
        } catch (error) {
            console.error('error :', error)
        }
    }

    const Handlesubmit = (e, value) => {
        
        e.preventDefault()
        if (value === 'annees') { Creation_annees(annees); setannees('')}
        if (value === 'categorie') { Creation_categorie(categorie); setcategorie('')}
        if (value === 'marque') { Creation_marque(marque); setmarque('')}
    }

    const Handlemodel = (e) => {
        
        if (!model || !idmarque) {
            alert('il manque un champs')
        } else {
            e.preventDefault()
            Creation_model(model, idmarque)
            setmodel('')
            setidmarque('')
        }
    }

    return(
        <div>
            <h1>Section création</h1>
            <h3>Ajouter des données dans votre bdd ou dans votre catalogue</h3>

            <form onSubmit={(e)=>Handlesubmit(e, 'annees')}>
                <input onChange={(e)=>setannees(e.target.value)} value={annees} type="text" placeholder="ajouter une années"/>
                <button type="submit">soumettre</button>
            </form>

            <form onSubmit={(e)=>Handlesubmit(e, 'categorie')}>
                <input onChange={(e)=>setcategorie(e.target.value)} value={categorie} type="text" placeholder="ajouter une categorie"/>
                <button type="submit">soumettre</button>
            </form>

            <form onSubmit={(e)=>Handlesubmit(e, 'marque')}>
                <input onChange={(e)=>setmarque(e.target.value)} value={marque} type="text" placeholder="ajouter une marque"/>
                <button type="submit">soumettre</button>
            </form>

            <form onSubmit={Handlemodel}>
                <input onChange={(e)=>setmodel(e.target.value)} value={model} type="text" placeholder="ajouter une model"/>
                <select onChange={(e)=>setidmarque(e.target.value)} value={idmarque}>
                    {listemarque?.map((marque)=> (
                        <option value={marque.id_marque} key={marque.id_marque}>{marque.name}</option>
                    ))}
                </select>
                <button type="submit">soumettre</button>
            </form>
        </div>
    )
}