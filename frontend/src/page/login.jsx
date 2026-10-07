
import { useState } from "react"
import { useAuth } from "../context/authcontexte"
import { Link } from "react-router-dom"
import './login.css'


export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {Login} = useAuth()

    const handlesubmit = (e) => {
        e.preventDefault()
        Login(email, password)
        setemail("")
        setpassword("")
    }

    return(
        <div className="login">
            <form onSubmit={handlesubmit} className="formulaire_login">
                <input onChange={(e)=>setemail(e.target.value)} type="text" value={email} placeholder="email"/>
                <input onChange={(e)=>setpassword(e.target.value)} type="password" value={password} placeholder="password"/>
                <button type="submit">envoyer</button>
                <p>Si vous n'avez pas de compte cliquez <Link to={'/register'}>ici</Link></p>
            </form>

            
        </div>
    )
}