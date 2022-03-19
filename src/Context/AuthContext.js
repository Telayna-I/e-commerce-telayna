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
    
    const [error, setError] = useState()

    const [user, setUser] = useState({
        uId: '',
        log: 'false'
    })


    useEffect(()=>{
        if(user.log === 'false'){
            
        }else{
            user.log && sessionStorage.setItem("loged", JSON.stringify(user.log));
            user.log && sessionStorage.setItem("id", JSON.stringify(user.uId));
        }
    },[user])
    
    

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
            console.log(response)
        }).catch((err)=>{
            console.log(err.code)
        })

    }

    const logOut = () =>{
        sessionStorage.clear();
        signOut(auth);
        setLoged(false);
    }

    return (
        <AuthContext.Provider value = {{signUp, loged, uId, error, logIn, logOut, setLoged, logInWithGoogle, user}}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider