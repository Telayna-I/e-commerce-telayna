import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, getFirestore, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)


export const getProducts = (categoryId) => {
    return new Promise((resolve, reject)=>{
        const collectionRef = categoryId ? query(collection(db,'products'), where('category', '==', categoryId)) : collection(db, 'products');
        
        getDocs(collectionRef).then(response => {
            const products = response.docs.map(doc => {
                return { id : doc.id, ...doc.data() }
            })
            resolve(products);
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const getDetail = (productId) => {

    return new Promise((resolve,reject)=>{
        
        const docRef = doc(db, 'products', productId);

        getDoc(docRef).then( response =>{
            const product = {id: response.id, ...response.data()}
            resolve(product)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const logIn = (email,password) => {
    return new Promise((resolve,reject)=>{
        signInWithEmailAndPassword(auth, email, password).then((response)=>{
            resolve({
                uId: response._tokenResponse.localId,
                log: true,
            })
            console.log(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const logInWithGoogle = () => {
    return new Promise((resolve,reject)=>{
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then((response)=>{
            resolve(response)
            console.log(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const signUp = (email,password) => {
    return new Promise((resolve,reject)=>{
        createUserWithEmailAndPassword(auth, email, password).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}
