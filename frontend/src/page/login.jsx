
import { useState } from "react"
import { useAuth } from "../context/authcontexte"


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
        <div>
            <form onSubmit={handlesubmit}>
                <input onChange={(e)=>setemail(e.target.value)} type="text" value={email} placeholder="email"/>
                <input onChange={(e)=>setpassword(e.target.value)} type="password" value={password} placeholder="password"/>
                <button type="submit">envoyer</button>
            </form>
        </div>
    )
}