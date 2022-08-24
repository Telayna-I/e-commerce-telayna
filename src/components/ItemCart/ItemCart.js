import './ItemCart.css'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { restar, removeItem } from '../../app/reducers/CartSlice/cartSlice'



const ItemCart = ({product}) =>{

    const { carrito } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleItem = ()=>{
        if(product.cantidad < 1){
            dispatch(removeItem(product.id,carrito))
        }else{
            dispatch(restar(product.id,carrito))
        }
    }

    
    return(
        <div className='producto'>
            <div className='datos'>
            <div className='item-img-container'>
                <img className ='producto-img' src = {product.img} alt = {product.name + "-" + product.id} />
            </div>
                <div className='datos-texto'>
                    <h2 className ='producto-title' >Producto: {product.name}</h2>
                    <p className ='producto-cantidad f' ><span className='fwb'>Cantidad:</span> {product.cantidad}</p>
                    <p className ='producto-precio f' ><span className='fwb'>Total: $</span> {product.price * product.cantidad}</p>
                </div>
            </div>
            <button className="btn-item" onClick={handleItem}>Eliminar</button>
        </div>
    );
}

export default ItemCart