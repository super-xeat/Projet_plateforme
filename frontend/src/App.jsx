import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './page/register';
import Authprovider from './context/authcontexte';
import Login from './page/login';
import Accueil from './page/Accueil';
import Navbar from './components/navbar';
import Profil from './page/profil';
import Admin from './page/Admin';
import AdminLayout from './context/AdminLayout';

export default function App() {


  return(
    <BrowserRouter>
      <Authprovider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Accueil/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profil' element={<Profil/>}/>
          <Route path='/admin' element={<AdminLayout/>}/>
          
        </Routes>
      </Authprovider>
    </BrowserRouter>
  )
}