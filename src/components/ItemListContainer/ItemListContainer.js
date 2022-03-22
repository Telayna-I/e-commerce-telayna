import './ItemListContainer.css'
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase'

const ItemListContainer = (props) =>{
    
    const { className } = props;
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState();
    const { categoryId } = useParams()

    
    useEffect(()=>{
        
        
        const collectionRef = categoryId ? query(collection(db,'products'), where('category', '==', categoryId)) : collection(db, 'products');
        
        getDocs(collectionRef).then(response => {
            const products = response.docs.map(doc => {
                return { id : doc.id, ...doc.data() }
            })
            setProduct(products);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })

    }, [categoryId]);


    
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
};

export default ItemListContainer