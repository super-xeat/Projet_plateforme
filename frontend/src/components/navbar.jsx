import './navbar.css'
import Recherche from './recherche'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authcontexte'
import { FaShoppingCart } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";


export default function Navbar() {

    const {profil} = useAuth()

    return (
        <div>
            <div className="navbar">
                <div className="navbar1">
                    <Link to={'/'} className='logo'>AutoPIECE</Link>
                    <Link to={'/catalogue/:id_catalogue'} className='navbar_catalogue'>catalogue</Link>
                </div>
 
                <div className="recherche-navbar">
                    <Recherche/>
                </div>
                
                <div className="navbar2">
                    <Link to={'/panier'}>
                        <FaShoppingCart size={25} color='white'/>
                    </Link>
                    {profil ? (
                        <Link  to={ profil?.role === 'admin' ? '/admin' : '/profil'}>
                            <LuCircleUserRound size={25} color='white'/>
                        </Link> 
                    ) : ( 
                        <Link to={'/login'}>
                            <LuCircleUserRound size={25} color='white'/>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}