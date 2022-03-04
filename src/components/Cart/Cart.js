import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import ItemCart from '../ItemCart/ItemCart'
import { NavLink } from 'react-router-dom'


const Cart = () => {

    const { cart, clearCart, total } = useContext(CartContext)
    
    const handleCart = () =>{
        clearCart()
    }

    if(cart.length > 0){
        return(
            <div className = 'cart-container'>
                <h2 className='title'>Carrito</h2>
                <div className='buttons'>
                    <button className='vaciar-carrito' onClick ={handleCart}>Vaciar carrito</button>
                </div>
                <div className='cartt'>
                    {cart.map((product,i)=>(
                        <ItemCart className = "item-cart" product = {product} key = {i}  />
                    ))}
                </div>

                <h4 className='precio-total' >El precio total es de: {total}</h4>
            </div>
        )
    }else{
        return(
            <div className='info'>
                <h2 className='h2-info'>El carrito esta vacio</h2>
                <NavLink to={'/'} className = "go-home" >Ir a Home</NavLink>
            </div>
        )
    }

}

export default Cart