import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import ItemCart from '../ItemCart/ItemCart'
import { NavLink } from 'react-router-dom'
import { addDoc, collection, writeBatch, getDoc, doc, Timestamp  } from 'firebase/firestore'
import { db } from '../../services/firebase/firebase'


const Cart = () => {

    const { cart, clearCart, precioTotal, removeItem } = useContext(CartContext)
    
    const vaciarCarro = () =>{
        clearCart()
    }
    
    const confirmOrder = () =>{
        const objOrder = {
            buyer: {
                name: 'iniaki',
                phone: '534856156',
                address: 'Mi direccion 123'
            },
            items: cart,
            total: precioTotal(),
            date: Timestamp.fromDate(new Date())
        }
        
        const batch = writeBatch(db);
        const outOfStock = [];

        const generateOrder = ()=>{
            if(outOfStock.length === 0){
                addDoc(collection(db,'orders'), objOrder).then(({id}) =>{
                    batch.commit().then(()=>{
                        console.log(`Su orden se genero exitosamente, su numero de orden es: ${id}`)
                        clearCart()
                    })
                })
            }else{
                outOfStock.forEach(product =>{
                    console.log(`El producto ${product.name} no tiene stock disponible 💔`)
                    removeItem(product.id)
                })
            }
        }
        let cont = 0;

        objOrder.items.forEach(product => {
            getDoc(doc(db, 'products', product.id)).then(response =>{
                if(response.data().stock >= product.cantidad){
                    batch.update(doc(db, 'products', response.id), {
                        stock: response.data().stock - product.cantidad
                    })
                    cont += 1

                }else{
                    outOfStock.push({id: response.id, ...response.data()})
                }
            }).catch((error)=>{
                console.log(error)
            }).then(()=>{
                cont === objOrder.items.length && generateOrder();
            })
        });
        
    }

    


    if(cart.length > 0){
        return(
            <div className = 'cart-container'>
                <h2 className='title'>Carrito</h2>
                <div className='cartt'>
                    {cart.map((product)=>(
                        <ItemCart className = "item-cart" product = {product} key = {product.id}  />
                    ))}
                </div>

                <h4 className='precio-total' >El precio total es de: ${precioTotal()}</h4>
                <div className='buttons'>
                    <button className='boton-carrito' onClick ={vaciarCarro}>Vaciar carrito</button>
                    <button className='boton-carrito' onClick ={confirmOrder}>Confirmar compra</button>
                </div>
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