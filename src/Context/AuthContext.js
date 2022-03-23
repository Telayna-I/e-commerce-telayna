import { createContext, useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, logInWithGoogle, signUp, logIn  } from "../services/firebase/firebase";


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}


const AuthContextProvider = ({ children }) =>{


    const [loged, setLoged] = useState(JSON.parse(sessionStorage.getItem("loged")) || false);

    const uId = useState(JSON.parse(sessionStorage.getItem("id")) || false);
    
    const [credential, setCredential] = useState({})

    const [error, setError] = useState()

    const [user, setUser] = useState({
        uId: '',
        log: 'false'
    })
    const [contact, setContact] = useState({
        address: '',
        name: '',
        phone: '',
    });    

    useEffect(()=>{
        if(user.log === 'false'){
            
        }else{
            user.log && window.sessionStorage.setItem("loged", JSON.stringify(user.log));
            user.log && window.sessionStorage.setItem("id", JSON.stringify(user.uId));
            window.sessionStorage.setItem("name", JSON.stringify(contact.name))
        }
    },[user, contact])


    const registrarse = (email, password)=>{
        signUp(email,password).then(response =>{
            setUser({
                uId: response._tokenResponse.localId,
                log: true,
            })
            setLoged(true)
        }).catch((err)=>{
            if(err.code === 'auth/email-already-in-use'){
                setError('El email utilizado ya se encuentra en uso');
            }
        })
    }
    
    const iniciarSesion = (email,password) => {
        logIn(email,password).then(response =>{
            setUser(response)
            setLoged(true)
        }).catch((err) =>{
            if(err.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta');
            }else if(err.code === 'auth/user-not-found'){
                setError('El email no se encuentra registrado')
            }
            console.log(err.message)
        })
    }

    const iniciarSesionGoogle = ()=>{
        logInWithGoogle().then(response =>{
            setUser({
                uId: response._tokenResponse.localId,
                log: true,
            })
            setLoged(true)
            setCredential(response._tokenResponse.displayName)
        }).catch((err)=>{
            console.log(err.code)
        })

    }

    const logOut = () =>{
        sessionStorage.clear();
        signOut(auth).catch((err)=>{
            console.log(err.code)
        });
        setLoged(false);
    }

    const infoContact = (data) => {
        return setContact({
            address: data.address,
            name: data.name || credential,
            phone: data.phone,
        })
    }

    return (
        <AuthContext.Provider value = {{registrarse, loged, uId, error, iniciarSesion, logOut, setLoged, iniciarSesionGoogle, user, credential, infoContact, contact, setContact}}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider