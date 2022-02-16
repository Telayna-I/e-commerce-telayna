import './App.css';
import NavBar from './components/Nav/Nav';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <div className = 'App' >
      <NavBar/>
      <ItemListContainer greeting = "Hola Mundo !" className = "saludo" />
      <ItemDetailContainer/>
    </div>
  );
}

export default App;
