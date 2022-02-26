import './ItemCart.css'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';



const ItemCart = ({product}) =>{
    const { removeItem } = useContext(CartContext)
    
    const handleItem = ()=>{
        removeItem(product.id)    
    }

    return(
        <div className='producto'>
            <div className='datos'>
                <img className ='producto-img' src = {product.img} alt = {product.name + "-" + product.id} />
                <h2 className ='producto-title' >{product.name}</h2>
                <p className ='producto-cantidad f' ><span className='fwb'>Cantidad:</span> {product.cantidad}</p>
                <p className ='producto-precio f' ><span className='fwb'>Total:</span> {product.price * product.cantidad}</p>
            </div>
            <button className="btn-item" onClick={handleItem}>Eliminar</button>
        </div>
    );
}

export default ItemCart