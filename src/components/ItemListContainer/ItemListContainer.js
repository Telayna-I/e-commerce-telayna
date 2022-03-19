import './ItemListContainer.css'
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams, Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase'
import { useAuth } from '../../Context/AuthContext'

const ItemListContainer = (props) =>{
    
    const { className } = props;
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState();
    const [session, setSession] = useState(false);
    const { categoryId } = useParams()
    const { loged } = useAuth();

    
    
    useEffect(()=>{
        
        loged && setSession(loged)
        
        const collectionRef = categoryId ? query(collection(db,'products'), where('category', '==', categoryId)) : collection(db, 'products');
        
        getDocs(collectionRef).then(response => {
            const products = response.docs.map(doc => {
                return { id : doc.id, ...doc.data() }
            })
            setProduct(products);
        })
        .catch(err => {
            console.log('error')
        }).finally(()=>{
            setLoading(false);
        })

    }, [categoryId, loged]);



    
    if(session){
        if (loading === false){
            return(
                <div className = 'item-list-container'>
                    <h2 className = {className}>Catalogo</h2>
                    <ItemList products = {products}/>
                </div>
        
        );
        }else{
            return(
                <div className='item-list-container'>
                    <h2 className = {className}>Work-Shop</h2>
                    <Spinner/>
                </div>
            )
        }
    }else{
        return(
            <div className='opciones'>
                <h1 className='title-opciones'>Lo sentimos 😥, para poder ver los productos debes iniciar sesion.</h1>
                <Link className='opcion' to={'/login'} >Inicia Sesion</Link>
                <Link className='opcion' to={'/register'} >Registrarse</Link>
            </div>

        )
    }
};

export default ItemListContainer