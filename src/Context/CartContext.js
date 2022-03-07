import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

const CartContextProvider = ({ children }) =>{

    const [cart, setCart] = useState([]);
    
    
    const addToCart = (item, cantidad)=>{
        if (search(item.id)) {
            sumar(item.id,cantidad)
        } else {
            setCart([ ...cart, { ...item, cantidad}]);
        }
    }

    const clearCart = ()=>{
        setCart([])
    }

    const removeItem = ( id ) =>{
        const carroFiltrado = cart.filter((product)=> product.id !== id)
        setCart(carroFiltrado)
    }

    const search = (id) =>{
        return cart.some((item) => item.id === id);
    }

    const sumar = (id, cantidad) =>{
        let newCart = cart.map((p)=>p);
        newCart.map((item)=> item.id === id && (item.cantidad += cantidad));
        setCart(newCart);
    }

    const restar = (id ) =>{
        let newCart = cart.map((p)=>p);
        newCart.map((item)=> item.id === id && (item.cantidad --));
        setCart(newCart);
        contarItems();
    }

    const contarItems = () =>{
        let quantity = 0;
        cart.map((item)=>(quantity += item.cantidad ));
        precioTotal();
        return quantity
    }

    const precioTotal = () =>{
        let finalPrice = 0;
        cart.map((item)=>(finalPrice += item.price * item.cantidad))
        return finalPrice
        
    }

    useEffect(()=>{
        if(cart.length > 0){
            contarItems();
            precioTotal();
        }

    },[cart.length])
    

    return (
        <CartContext.Provider value = {{cart, addToCart,clearCart,restar,contarItems, precioTotal,removeItem}}>
            { children }
        </CartContext.Provider>
    );
}


export default CartContextProvider