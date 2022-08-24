import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    carrito: JSON.parse(localStorage.getItem("carrito")) || [],
    length: 0
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state,action) =>{
            state.carrito = action.payload.carrito;
            window.localStorage.setItem("carrito", JSON.stringify(state.carrito));
        },
        countItems: (state,action) =>{
            state.length = action.payload.cantidad
        }
    }
});

export const { addToCart, countItems } = cartSlice.actions

export default cartSlice.reducer

export const restar = (id,carrito) => (dispatch) =>{
    let newCart = JSON.parse(JSON.stringify(carrito));
    newCart.map((item)=> item.id === id && (item.cantidad --));
    dispatch(addToCart({
        carrito: newCart,
    }));
    dispatch(contarItems(newCart))
}

export const removeItem = (id,carrito) => (dispatch) =>{
    let newCart = JSON.parse(JSON.stringify(carrito));
    newCart = newCart.filter((product)=> product.id !== id);
    dispatch(addToCart({
        carrito: newCart,
    }))
    dispatch(contarItems(newCart))
    
}

export const contarItems = (carrito) => (dispatch) =>{
    let quantity = 0;
    carrito.map((item)=>(quantity += item.cantidad ));
    dispatch(countItems({
        cantidad: quantity
    }))
}

export const precioTotal = (carrito) =>{
    let finalPrice = 0;
    carrito.map((item)=>(finalPrice += item.price * item.cantidad))
    return finalPrice
}


export const clearCart = () => (dispatch) =>{
    dispatch(addToCart({
        carrito: []
    }))
}

export const addItemToCart = (item,cantidad,carrito) => (dispatch) =>{
    if (dispatch(search(item.id,carrito))){
        dispatch(sumar(item.id,cantidad,carrito))
    } else {
        dispatch(addToCart({
            carrito: [ ...carrito, { ...item, cantidad}]
        }));
    }
}

export const search = (id,carrito) => () =>{
    return carrito.some((item) => item.id === id);
}

export const sumar = (id,cantidad,carrito) => (dispatch) =>{
    let newCart = JSON.parse(JSON.stringify(carrito));
    newCart.map((item)=> item.id === id && (item.cantidad += cantidad))
    dispatch(addToCart({
        carrito: newCart
    }));
    dispatch(contarItems(newCart))
}
