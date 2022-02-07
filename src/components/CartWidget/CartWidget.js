import './CartWidget.css'
import {FaShoppingCart} from 'react-icons/fa'

const CartWidget = ({size}) =>{
    return(
        <i className = 'fa-cart'><FaShoppingCart style = {{fontSize: size }}></FaShoppingCart></i>
    );
}

export default CartWidget