import { useState, useEffect } from "react";
import { useAuth } from "../../context/authcontexte";
import './Admin_creation.css';
import Ajout_produit from "../Admin/Ajout_produit";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";


export default function AdminCreation() {

    const [annees, setannees] = useState('')
    const [marque, setmarque] = useState('')
    const [model, setmodel] = useState('')
    const [idmarque, setidmarque] = useState('')

    const [idmodel, setidmodel] = useState('')
    const [nameVoiture, setnameVoiture] = useState('')
    const [idannees, setidannees] = useState('')

    const [Ajoutproduit, setAjoutproduit] = useState(false)

    const [ouvert, setouvert] = useState({
        annees: false,
        marque: false,
        model: false,
        vehicule: false
    })

    const {Get_marque, 
        listemarque, 
        Get_model, 
        listemodel, 
        Get_annees, 
        listeannees,
        listeVehicule
      } = useAuth()


    useEffect(()=> {
        Get_marque()
        Get_model()
        Get_annees()
    }, [])

    function toggle(nom) {
        setouvert({...ouvert, [nom]: !ouvert[nom]})
    }

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

            <div className="conteneur1">
                <h1>Section création</h1>
                <p>Ajouter des données dans votre bdd ou dans votre catalogue</p>
            </div>
            
            {Ajoutproduit === true ? (
                <div>
                    <Ajout_produit onbutton={setAjoutproduit}/>                  
                </div>
            ) : (
                <button onClick={()=>setAjoutproduit(true)} className="button1">
                    Ajouter un produit
                </button>
            )}

            <div className="forms-grid">
                <form onSubmit={(e) => Handlesubmit(e, 'annees')}>
                    <div className="input-group">
                        <input 
                            onChange={(e) => setannees(e.target.value)} 
                            value={annees} 
                            type="text" 
                            placeholder="Ex: 2024" 
                        />
                        <button 
                            type="button" 
                            className="btn-icon" 
                            onClick={() => toggle('annees')}
                            title="Voir la liste"
                        >
                        {ouvert.annees ? <IoClose /> : <IoIosArrowDown />}
                        </button>
                        <button type="submit" className="btn-submit">Ajouter l'année</button>
                    </div>
                    {ouvert.annees && (
                        <ul className="items-list">
                        {listeannees.map((item) => (
                            <li key={item.id_annees}>{item.name}</li>
                        ))}
                        </ul>
                    )}

                    
                </form>

                <form onSubmit={(e)=>Handlesubmit(e, 'marque')}>
                    <div className="input-group">
                        <input onChange={(e)=>setmarque(e.target.value)} value={marque} type="text" placeholder="ajouter une marque"/>
                        <button 
                            type="button" 
                            className="btn-icon" 
                            onClick={() => toggle('marque')}
                        >
                            {ouvert.marque ? <IoClose /> : <IoIosArrowDown />}
                        </button>
                        <button type="submit" className="btn-submit">Ajouter une marque</button>

                    </div>
                    {ouvert.marque && (
                        <ul className="items-list">
                        {listemarque.map((item) => (
                            <li key={item.id_marque}>{item.name}</li>
                        ))}
                        </ul>
                    )}
                    
                    
                </form>

                <form onSubmit={Handlemodel}>
                    <div className="input-group">
                        <input onChange={(e)=>setmodel(e.target.value)} value={model} type="text" placeholder="ajouter un model"/>
                        <select onChange={(e)=>setidmarque(e.target.value)} value={idmarque} className="admin-select">
                            {listemarque?.map((marque)=> (
                                <option value={marque.id_marque} key={marque.id_marque}>{marque.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn-submit">Ajouter un model</button>
                    </div>
                </form>

                <form onSubmit={Handlevehicule}>
                    <div className="input-group">
                        <input onChange={(e)=>setnameVoiture(e.target.value)} type="text" value={nameVoiture} placeholder="Ex: 2.0 HDi 150ch"/>

                        <select onChange={(e)=>setidmodel(e.target.value)} value={idmodel} className="admin-select">
                            {listemodel.map((model)=> (
                                <option key={model.id_model} value={model.id_model}>
                                    {model.marque_name} {model.model_name} 
                                </option>
                            ))}
                        </select>
                        <select onChange={(e)=>setidannees(e.target.value)} value={idannees} className="admin-select">
                            {listeannees.map((annees)=>(
                                <option value={annees.id_annees} key={annees.id_annees}>
                                    {annees.name}
                                </option>
                            ))}
                        </select>
                        
                        <button type="submit" className="btn-submit">soumettre</button>
                    </div>
                </form>
            </div>
        </div>
    )
}