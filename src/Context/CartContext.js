import { createContext, useState } from "react";

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

    console.table(cart)
    return (
        <CartContext.Provider value = {{cart, addToCart,clearCart,removeItem}}>
            { children }
        </CartContext.Provider>
    );
}


export default CartContextProvider