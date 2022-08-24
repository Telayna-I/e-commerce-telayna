import { createSlice } from '@reduxjs/toolkit'
import { logIn, logInWithGoogle, signUp, auth } from '../../../services/firebase/firebase'
import { signOut } from 'firebase/auth'

const initialState = {
    loged: JSON.parse(sessionStorage.getItem("loged")) || false,
    uId: JSON.parse(sessionStorage.getItem("id")) || false,
    credential: {},
    error: null,
    user: {
        uId:'',
        log: 'false'
    },
    contact: {
        address: '',
        name: '',
        phone: '',
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        logInNormal:  (state, action) => {
            state.user = action.payload.user;
            state.loged = action.payload.loged;
            window.sessionStorage.setItem("loged", JSON.stringify(action.payload.loged));
            window.sessionStorage.setItem("id", JSON.stringify(action.payload.user.uId));
        },
        setError: (state, action) =>{
            state.error = action.payload.error
        },
        logInGoogle: (state, action) =>{
            state.user.uId = action.payload.uId;
            state.user.log = action.payload.log;
            window.sessionStorage.setItem("loged", JSON.stringify(action.payload.log));
            window.sessionStorage.setItem("id", JSON.stringify(action.payload.uId));
            state.loged = action.payload.loged;
            state.credential = action.payload.credential;
        },
        registroNormal: (state, action) =>{
            state.user.uId = action.payload.uId;
            state.user.log = action.payload.log;
            window.sessionStorage.setItem("loged", JSON.stringify(action.payload.log));
            window.sessionStorage.setItem("id", JSON.stringify(action.payload.uId));
            state.loged = action.payload.loged;
        },
        cerrarSesion: (state, action) =>{
            state.loged = action.payload.loged
            window.sessionStorage.setItem("loged", JSON.stringify(action.payload.loged));
        },
        setContact: (state, action) =>{
            state.contact.address = action.payload.address;
            state.contact.name = action.payload.name;
            window.sessionStorage.setItem("name", JSON.stringify(action.payload.name));
            state.contact.phone = action.payload.phone;
        }
        
    }
})

export const { logInNormal, setError, logInGoogle, registroNormal, cerrarSesion, setContact } = authSlice.actions

export default authSlice.reducer

export const infoContact = (data) =>{
    return (dispatch, selector) =>{
        const { credential } = selector(state => state.auth)
        dispatch(setContact({
            address: data.address,
            name: data.name || credential,
            phone: data.phone,
        }))
    }
}

export const iniciarSesion = (email,password) => (dispatch) =>{
    logIn(email,password).then(response =>{
        dispatch(logInNormal({
            user: response,
            loged : true
        }))
    }).catch((err) =>{
        if(err.code === 'auth/wrong-password'){
            dispatch(setError({
                error: 'Contraseña / email incorrecto'
            }));
        }else if(err.code === 'auth/user-not-found'){
            dispatch(setError({
                error: 'El usuario no se encuentra registrado'
            }));
        }
    })
}


export const iniciarSesionGoogle = () => (dispatch) =>{
    logInWithGoogle().then(response =>{
        dispatch(logInGoogle({
            uId: response._tokenResponse.localId,
            log: true,
            loged: true,
            credential: response._tokenResponse.displayName,
        }))
    }).catch((err)=>{
        console.log(err.code)
    })
}

export const registrarse = (email,password) => (dispatch) =>{
    signUp(email,password).then(response =>{
        dispatch(registroNormal({
            uId: response._tokenResponse.localId,
            log: true,
            loged: true,
        }))
    }).catch((err)=>{
        if(err.code === 'auth/email-already-in-use'){
            dispatch(setError({
                error: 'El email utilizado ya se encuentra en uso'
            }));
        }
    })
}
export const logOut = () => (dispatch)=>{
    sessionStorage.clear();
    signOut(auth).catch((err)=>{
        console.log(err.code)
    });
    dispatch(cerrarSesion({
        loged: false
    }));
}