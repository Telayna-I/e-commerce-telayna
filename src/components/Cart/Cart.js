import './Cart.css'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import ItemCart from '../ItemCart/ItemCart'
import { NavLink } from 'react-router-dom'
import { addDoc, collection, writeBatch, getDoc, doc, Timestamp  } from 'firebase/firestore'
import { db } from '../../services/firebase/firebase'
import Spinner from '../Spinner/Spinner';
import PayForm from '../PayForm/PayForm'



const Cart = () => {
    const [confirmarCompra, setConfirmarCompra] = useState(true)
    

    const { cart, clearCart, precioTotal, removeItem, contact, setContact } = useContext(CartContext)

    const [processingOrder, setProcessingOrder] = useState(false)
    
    const vaciarCarro = () =>{
        clearCart()
    }

    const confirmPurchase = () => {
        setConfirmarCompra(false);
    }
    useEffect(()=>{
        contact.address && setProcessingOrder(true);
        contact.address && confirmOrder()
        contact.address && setContact({
            address: '',
            name: '',
            phone: '',
        })
    },[contact])
    
    const confirmOrder = () =>{
        const objOrder = {
            buyer: contact,
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
                        setProcessingOrder(false)
                    })
                })
            }else{
                outOfStock.forEach(product =>{
                    setProcessingOrder(false)
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
    useEffect(()=>{
        if(processingOrder){
            return(
                <Spinner/>
            )
        }
    },[processingOrder])

    if(cart.length === 0){
        return(
            <div className='info'>
                <h2 className='h2-info'>El carrito esta vacio</h2>
                <NavLink to={'/'} className = "go-home" >Ir a Home</NavLink>
            </div>
        )
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
                    {confirmarCompra && <button className='boton-carrito' onClick ={confirmPurchase}>Confirmar compra</button>}
                </div>

                {!confirmarCompra && <PayForm/>}
            </div>
        )
    }

}

export default Cart