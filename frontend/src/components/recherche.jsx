import './recherche.css'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


export default function Recherche() {

    const [recherche, setrecherche] = useState('')
    const navigate = useNavigate()

    
    function handlesubmit(e) {
        e.preventDefault()
        const terme = recherche.trim()
        navigate(`/catalogue?valeur=${encodeURIComponent(terme)}&page=1`)
    }
  
    return (
        <div className='recherche'>
            
            <form onSubmit={handlesubmit} className='form_recherche'>
                <input type="text" placeholder='rechercher' onChange={(e)=>setrecherche(e.target.value)}/>
                <button type='submit' className='navbar_recherche'>
                    <FaSearch size={20} color='white'/>
                </button>
            </form>
    
        </div>
    )
} 