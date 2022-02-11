import ItemCount from '../ItemCount/ItemCount';
import './ItemListContainer.css'

const ItemListContainer = (props) =>{

    const { greeting, className } = props;


    const Agregar = (numero) =>{
        console.log(`Agregue ${numero} camisas`)
    }


    return(
        <div className = 'item-list-container'>
            <h2 className = {className}>{greeting}</h2>
            <ItemCount total = {10} inicial = {1} onAdd = {Agregar} />
        </div>
    )
} 

export default ItemListContainer