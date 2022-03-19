import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import LogIn from './components/LogIn/LogIn';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartContextProvider from './Context/CartContext';
import AuthContextProvider  from './Context/AuthContext';

function App() {
  return (
    <div className = 'App' >
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <NavBar/>
              <Routes>
                <Route path = '/' element = {<ItemListContainer greeting = "Hola Mundo !" className = "saludo" />}/>
                <Route path = '/login' element = {<LogIn/>}/>
                <Route path = '/register' element = {<RegisterForm/>}/>
                <Route path = '/category/:categoryId' element = {<ItemListContainer className = "saludo"/>}/>
                <Route path = '/detail/:productId' element = {<ItemDetailContainer/>}/>
                <Route path = '/cart' element = {<Cart/>}/>
              </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
