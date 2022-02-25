import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import { Link } from 'react-router-dom'

const ItemDetail = ({ item }) =>{
    
    const [quantity,setQuantity] = useState(0)
    console.log(quantity)

    const Agregar = (numero) =>{
        let number = numero;
        number = parseInt(number)
        setQuantity(number);
        console.log(quantity)
        
    }

    return(
        <div className = 'detail'>
            <img className = 'img-details' src = {item.img} />
            <div className = 'details'>
                <h2 className = 'title-detail'> {item.name} </h2>
                <p className = 'description-detail' > {item.description} </p>
                <div className = 'price-detail'> Precio: $ {item.price} </div>
                <div className = 'stock-detail'> Stock: {item.stock} unidades </div>
                <div className = 'color-detail'> Color: {item.color} </div>
                <div className = 'category-detail'> Categoria: {item.category} </div>
                {quantity === 0 ? <ItemCount total = {item.stock} inicial = {0} onAdd = {Agregar}/>  : <Link className = "pagar" to = {'/cart'} >Pagar</Link> }
            </div>
        </div>
    );

}



export default ItemDetail
