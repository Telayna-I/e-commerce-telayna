import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import ItemCart from '../ItemCart/ItemCart'


const Cart = () => {

    const { cart, clearCart } = useContext(CartContext)
    
    const handleCart = () =>{
        clearCart()
    }

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
        </div>
    )
}

export default Cart