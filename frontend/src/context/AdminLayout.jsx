
import Admin from "../page/Admin";
import { useAuth } from "./authcontexte";


export default function AdminLayout() {

    const {profil} = useAuth()

    if (!profil || profil.role !== 'admin') {
        return (
            <div>
                <h1>seul les admin du site peuvent accéder a cette route</h1>
            </div>
        )
    } else {
        return <Admin/>
    }
}