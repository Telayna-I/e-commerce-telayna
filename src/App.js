import './App.css';
import NavBar from './components/Nav/nav';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'


function App() {
  return (
    <div className = 'App' >
      <NavBar></NavBar>
      <ItemListContainer greeting = "Hola Mundo !"></ItemListContainer>
    </div>
  );
}

export default App;
