import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import Swal from 'sweetalert2';


const ItemDetail = ({ item }) =>{
    
    const [quantity,setQuantity] = useState(0)

    const {addToCart} = useContext(CartContext)
    
    const alerta = ()=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: `Se agrego el item al carrito `,
        })
    }


    const agregar = (cantidad) =>{
        if(cantidad > 0){
            setQuantity(cantidad);
            addToCart(item,cantidad);
            console.log(addToCart)
            alerta()
        }
        
    }



    


    return(
        <div className = 'detail'>
            <img className = 'img-details' src = {item.img} alt = 'img-detail' />
            <div className = 'details'>
                <h2 className = 'title-detail'> {item.name} </h2>
                <p className = 'description-detail' > {item.description} </p>
                <div className = 'price-detail'> Precio: $ {item.price} </div>
                <div className = 'stock-detail'> Stock: {item.stock} unidades </div>
                <div className = 'color-detail'> Color: {item.color} </div>
                <div className = 'category-detail'> Categoria: {item.category} </div>
                {quantity === 0 ? <ItemCount total = {item.stock} inicial = {quantity} onAdd = {agregar}/>  : <Link className = "pagar" to = {'/cart'} >Ir al carrito</Link> }
            </div>
        </div>
    );

}



export default ItemDetail
