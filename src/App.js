import './App.css';
import NavBar from './components/Nav/Nav';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className = 'App' >
      <NavBar/>
      <ItemListContainer greeting = "Hola Mundo !" className = "saludo" />
    </div>
  );
}

export default App;
