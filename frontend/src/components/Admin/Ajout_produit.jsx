import { useState, useEffect } from "react"
import { useAuth } from "../../context/authcontexte"
import './Ajout_produit.css'

export default function Ajout_produit({onbutton}) {

    const [nameproduct, setnameproduct] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [image, setimage] = useState('')
    const [stock, setstock] = useState('')

    const [productCateId, setproductCateId] = useState('')
    const [productId, setproductId] = useState('')

    const [nameCars, setnameCars] = useState([])
    const [productVehicule, setproductVehicule] = useState([])

    const {Get_categorie, listeCategorie, Get_vehicule, listeVehicule} = useAuth()

    useEffect(()=> {
        Get_categorie()
        Get_vehicule()
    }, [] )


    async function Creation_produit() {
        try {
            const response = await fetch('http://localhost:8000/api/admin/ajout_produit', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    name: nameproduct,
                    description: description,
                    price: price,
                    stock: stock,
                    image: image,
                    id_categorie: productCateId,
                    valuesVehicule: productVehicule
                })
            })
            if (response.ok) {
                alert('nouveau produit créer')
            }
        } catch (error) {
            console.log('erreur :', error)
        }
    }

    function Remplissage(value) {
        const car = listeVehicule.find(c => c.id_vehicule === Number(value))
        setnameCars([...nameCars, car.name])
        setproductVehicule([...productVehicule, value])
        setproductId('')
    }

    function Handlesubmit(e) {
        e.preventDefault()
        Creation_produit()
        setnameproduct('')
        setdescription('')
        setprice('')
        setimage('')
        setstock('')

        setproductCateId('')
        setproductId('')

        setproductVehicule([])
        setnameCars([])
    }

    return(
            <div className="conteneur">
                
                <form onSubmit={Handlesubmit} className="formulaire_ajout_produit">
                    <button onClick={()=>onbutton(false)}>X</button>
                    <input onChange={(e)=>setnameproduct(e.target.value)} value={nameproduct} type="text" placeholder="nom du produit"/>
                    <input onChange={(e)=>setdescription(e.target.value)} value={description} type="text" placeholder="description"/>
                    <input onChange={(e)=>setprice(e.target.value)} value={price} type="number" placeholder="prix"/>
                     
                    <input onChange={(e)=>setimage(e.target.value)} value={image} type="text" placeholder="copiez une URL"/>
                    <input onChange={(e)=>setstock(e.target.value)} value={stock} type="number" placeholder="ajouter la quantité disponible"/>

                    <select onChange={(e)=>setproductCateId(e.target.value)} value={productCateId}>
                        {listeCategorie.map((categorie)=> (
                            <option key={categorie.id_categorie} value={categorie.id_categorie}>
                                {categorie.name}
                            </option>
                        ))}
                    </select>
                    
                    {nameCars.map((car, index)=> (
                        <p key={index}>{car}</p>
                    ))}

                    <select onChange={(e)=>Remplissage(e.target.value)} value={productId}>
                        {listeVehicule.map((vehicule)=>(
                            <option key={vehicule.id_vehicule} value={vehicule.id_vehicule}>
                                {vehicule.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Enregistrer ce produit</button>
                </form>
            </div>
    )
}