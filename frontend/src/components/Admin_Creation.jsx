import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontexte";
import './Admin_creation.css';
import Ajout_produit from "./Ajout_produit";



export default function AdminCreation() {

    
    const [categorie, setcategorie] = useState('')
    const [annees, setannees] = useState('')
    const [marque, setmarque] = useState('')
    const [model, setmodel] = useState('')
    const [idmarque, setidmarque] = useState('')

    const [idmodel, setidmodel] = useState('')
    const [nameVoiture, setnameVoiture] = useState('')
    const [idannees, setidannees] = useState('')

    const [Ajoutproduit, setAjoutproduit] = useState(false)

    const {Get_marque, listemarque, Get_model, listemodel, Get_annees, listeannees  } = useAuth()

    useEffect(()=> {
        Get_marque()
        Get_model()
        Get_annees()
    }, [])

    async function Creation_annees(annees) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_annees', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                credentials: 'include',
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
                credentials: 'include',
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
                credentials:'include',
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
                credentials: 'include',
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

    async function Creation_vehicule(namevoiture, idmodel, idannees) {

        try {
            const response = await fetch('http://localhost:8000/api/admin/creation_vehicule', {
                method: 'POST',
                headers: {'content-type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    name: namevoiture,
                    id_model: idmodel,
                    id_annees: idannees
                })
            })

            if (response.ok) {
                alert('nouveau véhicule créer')
            }
        } catch (error) {
            console.error('erreur :', error)
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

    const Handlevehicule = (e) => {

        if (!nameVoiture || !idmodel || !idannees) {
            alert('il manque un champs')
        } else {
            e.preventDefault()
            Creation_vehicule(nameVoiture, idmodel, idannees)
            setnameVoiture('')
            setidannees('')
            setidmodel('')
        }
    }


    return(
        <div className="Admin_creation">
            <h1>Section création</h1>
            <h3>Ajouter des données dans votre bdd ou dans votre catalogue</h3>

            
            {Ajoutproduit === true ? (
                <div>
                    <Ajout_produit onbutton={setAjoutproduit}/>
                    
                </div>
            ) : (
                <button onClick={()=>setAjoutproduit(true)}>Ajouter un produit</button>
            )}

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
                <input onChange={(e)=>setmodel(e.target.value)} value={model} type="text" placeholder="ajouter un model"/>
                <select onChange={(e)=>setidmarque(e.target.value)} value={idmarque}>
                    {listemarque?.map((marque)=> (
                        <option value={marque.id_marque} key={marque.id_marque}>{marque.name}</option>
                    ))}
                </select>
                <button type="submit">soumettre</button>
            </form>

            <form onSubmit={Handlevehicule}>
                <input onChange={(e)=>setnameVoiture(e.target.value)} type="text" value={nameVoiture} placeholder="ajouter une motorisation"/>

                <select onChange={(e)=>setidmodel(e.target.value)} value={idmodel}>
                    {listemodel.map((model)=> (
                        <option key={model.id_model} value={model.id_model}>
                            {model.marque_name} {model.model_name} 
                        </option>
                    ))}
                </select>
                <select onChange={(e)=>setidannees(e.target.value)} value={idannees}>
                    {listeannees.map((annees)=>(
                        <option value={annees.id_annees} key={annees.id_annees}>
                            {annees.name}
                        </option>
                    ))}
                </select>
                <button type="submit">soumettre</button>
            </form>
           
        </div>
    )
}