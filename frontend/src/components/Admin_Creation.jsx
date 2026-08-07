import { useState } from "react";


export default function AdminCreation() {

    const [Actifpage, setActifpage] = useState('profil')
    const [categorie, setcategorie] = useState('')
    const [annees, setannees] = useState('')
    const [marque, setmarque] = useState('')
    const [model, setmodel] = useState('')


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

    const Handlesubmit = (e, value) => {
        console.log('larry')
        e.preventDefault()
        if (value === 'annees') { Creation_annees(annees); setannees('')}
        if (value === 'categorie') { Creation_categorie(categorie); setcategorie('')}
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
        </div>
    )
}