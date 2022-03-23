import { createContext, useState, useEffect } from "react";



export const CartContext = createContext();



const CartContextProvider = ({ children }) =>{

    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("carrito")) || []);

    
    const addToCart = (item, cantidad)=>{
        if (search(item.id)){
            sumar(item.id,cantidad)
        } else {
            setCart([ ...cart, { ...item, cantidad}]);
        }
    }

    
    const saveLocal = ()=>{
        window.sessionStorage.setItem("carrito", JSON.stringify(cart));
    }
    
    cart.length > 0 && saveLocal();

    const clearCart = ()=>{
        setCart([]);
        saveLocal();
    }

    const removeItem = ( id ) =>{
        const carroFiltrado = cart.filter((product)=> product.id !== id);
        setCart(carroFiltrado);
        saveLocal();
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

    
    const [confirmForm, setConfirmForm,] = useState(false);
    
    
    
    
    
    useEffect(()=>{
        if(cart.length > 0){
            contarItems();
            precioTotal();
            cart.map((item)=> item.cantidad === 0 && removeItem(item.id))
        }
        saveLocal()
        

    },[cart])
    
    

    return (
        <CartContext.Provider value = {{cart, addToCart,clearCart,restar,contarItems, precioTotal,removeItem,  confirmForm, setConfirmForm}}>
            { children }
        </CartContext.Provider>
    );
}


export default CartContextProvider