import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../app/reducers/CartSlice/cartSlice';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

const ItemDetail = ({ item }) =>{
    
    const [quantity,setQuantity] = useState(0)
    const dispatch = useDispatch()
    
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
    
    const { carrito } = useSelector(state => state.cart)
    
    const agregar = (cantidad) =>{
        if(cantidad > 0){
            setQuantity(cantidad);
            dispatch(addItemToCart(item,cantidad,carrito));
            alerta()
        }
        
    }



    


    return(
        <>
            <div className='img-detalle-container'>
                <img className = 'img-detailss' src = {item.img} alt = 'img-detail' />
            </div>
            <div className = 'details'>
                <h2 className = 'title-detail'> {item.name} </h2>
                <p className = 'description-detail' > {item.description} </p>
                <div className = 'data-detail'> Precio: $ <span className='span-data'>{item.price}</span></div>
                <div className = 'data-detail'> Stock: <span className='span-data'>{item.stock}</span></div>
                <div className = 'data-detail'> Color: <span className='span-data'>{item.color}</span> </div>
                <div className = 'data-detail'> Categoria: <span className='span-data'>{item.category}</span></div>
                {quantity === 0 ? <ItemCount className = "conter" total = {item.stock} inicial = {quantity} onAdd = {agregar}/>  : <Link className = "pagar" to = {'/cart'} >Ir al carrito</Link> }
            </div>
        </>
    );

}



export default ItemDetail
