import './Cart.css'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import ItemCart from '../ItemCart/ItemCart'
import { NavLink } from 'react-router-dom'
import { addDoc, collection, writeBatch, getDoc, doc, Timestamp  } from 'firebase/firestore'
import { db } from '../../services/firebase/firebase'
import Spinner from '../Spinner/Spinner';
import PayForm from '../PayForm/PayForm'
import { useAuth } from '../../Context/AuthContext'
import Swal from 'sweetalert2';



const Cart = () => {
    const [confirmarCompra, setConfirmarCompra] = useState(true)
    

    const { cart, clearCart, precioTotal, removeItem } = useContext(CartContext)

    const [processingOrder, setProcessingOrder] = useState(false)
    
    const [idCompra, setIdCompra] = useState()

    const { contact, setContact} = useAuth()

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


    const alerta = ((prod)=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'error',
            title: `El producto ${prod.name} no tiene stock disponible 💔`,
        })

    }) 
    
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
                        clearCart()
                        setProcessingOrder(false)
                        setIdCompra(id)
                    })
                })
            }else{
                outOfStock.forEach(product =>{
                    setProcessingOrder(false)
                    console.log(product.name)
                    alerta(product)
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
                    cont += 1
                }
            }).catch((error)=>{
                console.log(error)
            }).then(()=>{
                cont === objOrder.items.length && generateOrder();
            })
        });
    }

    
    useEffect(()=>{

    },[processingOrder])
    
    
    
    
    if(processingOrder){
        return(
            <div className='spinner-container'>
                <h2 className='procesando'>Su orden esta siendo procesada...</h2>
                <Spinner className = 'spinner-processin' />
            </div>
        )
    }else if(cart.length > 0){
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
                    <NavLink className = 'boton-carrito' to = {'/'} >Seguir comprando</NavLink>
                </div>

                {!confirmarCompra && <PayForm/>}
            </div>
        )
    }else if(idCompra){
        return(
            <div className = 'info'>
                <h2 className = 'title-info'>Gracias por tu compra  {JSON.parse(sessionStorage.getItem("name"))} ! </h2>
                <p className='p-info'>Tu codigo de seguimiento es <span className='codigo-compra'>{idCompra}</span> </p>
                <p className='p-info codigo-compra'>Asegurese de anotar su codigo de compra, de lo contrario no podra rastrear el pedido.</p>
                <NavLink to={'/'} className = "go-home" >Ir a Home</NavLink>

            </div>

        )
    }else{
        return(
            <div className = 'info'>
                <h2 className='title-info'>El carrito esta vacio</h2>
                <NavLink to={'/'} className = "go-home" >Ir a Home</NavLink>
            </div>
        )
    }

}

export default Cart