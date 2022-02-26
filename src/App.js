import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartContextProvider from './Context/CartContext';

function App() {
  return (
    <div className = 'App' >
      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path = '/' element = {<ItemListContainer greeting = "Hola Mundo !" className = "saludo" />}/>
              <Route path = '/category/:categoryId' element = {<ItemListContainer className = "saludo"/>}/>
              <Route path = '/detail/:productId' element = {<ItemDetailContainer/>}/>
              <Route path = '/cart' element = {<Cart/>}/>
            </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
