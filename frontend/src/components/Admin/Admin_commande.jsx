import { useState, useEffect } from 'react'
import './Admin_commande.css'



export default function Admin_commande() {

    const [commande, setcommande] = useState([])
    

    async function obtenir_commande() {
        try {
            const response = await fetch('http://localhost:8000/api/admin/obtenir_commande', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setcommande(data.commande)
            }

        } catch (error) {
            console.log('error :', error)
        }
    }

    async function modify_commande(statut, id_commande) {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/modify_commande/${id_commande}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    statut
                })
            })
            if (response.ok) {
                alert('statut modifié')
                obtenir_commande()
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    useEffect(()=> {
        obtenir_commande()
    }, [])


    return (
        <div className="Admin_commande">
            <h1 className='commande_titre'>Admin commande</h1>
            
            <table>
                <thead className='tableau_commande'>
                    <tr>
                        <th>commande</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Total</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {commande && commande.map((c)=> (
                        <tr key={c.id_commande}>
                            <td>{c.id_commande}</td>
                            <td>{c.date}</td>
                            <td>{c.nom} - {c.email}</td>
                            <td>
                                <select
                                    value={c.statut}
                                    onChange={(e) => modify_commande(e.target.value, c.id_commande)}
                                >
                                    <option value="en cours">En cours</option>
                                    <option value="expédié">Expédié</option>
                                    <option value="livré">Livré</option>
                                </select>
                            </td>
                            <td>{c.montant_total}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div> 
    )
}