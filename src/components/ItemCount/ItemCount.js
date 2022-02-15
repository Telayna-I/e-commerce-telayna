import './ItemCount.css'
import { useState } from 'react'

const ItemCount = (props) => {
    
    const {total = 1, inicial = 1, onAdd} = props;

    const [numero, setNumero] = useState (inicial);
    
    const Aumentar = () => {
        if (numero < total){
            setNumero(numero + 1)
        }
    };

    const Reducir = () => {
        if(numero > 0){
            setNumero(numero - 1)
        }
    };


    return(
        <div className = "item-count">
            <div className = "counter">
                <button className = "btn btn-decrement" onClick ={Reducir}>-</button>
                <h2 className = 'numero' > { numero } </h2>
                <button className = "btn btn-increment" onClick = {Aumentar}>+</button>
            </div>
            <button className = "btn-" onClick ={()=> onAdd(numero)}>Agregar al carrito</button>
        </div>
    );
}


export default ItemCount