import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './reducers/AuthSlice/authSlice'
import cartSlice from './reducers/CartSlice/cartSlice'

export default configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice
    },
})
