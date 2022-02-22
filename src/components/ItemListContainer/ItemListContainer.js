import './ItemListContainer.css'
import { getCategory } from '../../Mock/Products';
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';


const ItemListContainer = (props) =>{
    
    const { className } = props;
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState();
    const { categoryId } = useParams()

    
    useEffect(()=>{
        getCategory(categoryId)
        .then(res =>{
            setProduct(res);
            setLoading(false);
        })
        .catch(err =>{
            console.log('error');;
        })
        .finally(() =>{
        })
    }, [categoryId, loading]);


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
                {/* <h4 className='espera'>Su solicitud esta siendo procesada</h4> */}
            </div>
        )
    }
};

export default ItemListContainer