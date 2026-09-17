import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Register from './page/register';
import Authprovider from './context/authcontexte';
import Login from './page/login';
import Accueil from './page/Accueil';
import Navbar from './components/navbar';
import Profil from './page/profil';
import AdminLayout from './context/AdminLayout';
import Catalogue from './components/catalogue';
import ProductCard from './components/product_card';
import Panier_vide from './components/Panier_vide';
import Panier from './components/panier';
import './app.css'



function Main() {
  return(
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default function App() {

  return(
    <BrowserRouter>
      <Authprovider>
        <Routes>

          <Route element={<Main/>}>
            <Route path='/' element={<Accueil/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profil' element={<Profil/>}/>
            <Route path='/catalogue' element={<Catalogue/>}/>
            <Route path='/catalogue/:id_catalogue' element={<Catalogue/>}/>     
            <Route path='/product_card/:id_product' element={<ProductCard/>}/>
            <Route path='/panier' element={<Panier/>}/>
            <Route path='/panier_vide' element={<Panier_vide/>}/>
          
          </Route>

          
          <Route path='/admin' element={<AdminLayout/>}/>
          

        </Routes>
      </Authprovider>
    </BrowserRouter>
  )
}