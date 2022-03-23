import { createContext, useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../services/firebase/firebase";


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


    const signUp = (email, password)=>{
        createUserWithEmailAndPassword(auth, email, password).then((response)=>{
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

    const logIn = (email,password)=>{
        signInWithEmailAndPassword(auth, email, password).then((response)=>{
            setUser({
                uId: response._tokenResponse.localId,
                log: true,
            })
            setLoged(true)
            console.log(response)
        }).catch((err) =>{
            if(err.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta');
            }else if(err.code === 'auth/user-not-found'){
                setError('El email no se encuentra registrado')
            }
            console.log(err.message)
        })
    }

    const logInWithGoogle = ()=>{
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then((response)=>{
            setUser({
                uId: response._tokenResponse.localId,
                log: true,
            })
            setLoged(true)
            setCredential(response._tokenResponse.displayName)
            console.log(response)
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
        <AuthContext.Provider value = {{signUp, loged, uId, error, logIn, logOut, setLoged, logInWithGoogle, user, credential, infoContact, contact, setContact}}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider