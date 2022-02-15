import ItemCount from '../ItemCount/ItemCount';
import './ItemListContainer.css'
import { getProducts } from '../../Mock/Products';
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = (props) =>{

    const { greeting, className } = props;
    const [products, setProduct] = useState([]);
    const [estado, setEstado] = useState(false);
    
    useEffect(()=>{
        getProducts
        .then((res) =>{
            setProduct(res);
            setEstado(true);
        })
        .catch(()=>{
            console.log('error');;
        })
        .finally(() =>{
            // se ejecuta siempre y al final.
        })
    }, []);

    if (estado == true){
        return(
            <div className = 'item-list-container'>
                <h2 className = {className}>{greeting}</h2>
                <ItemList products = {products}/>
            </div>
    
        );
    }else{
        return(
            <div className='item-list-container'>
                <h2 className = {className}>{greeting}</h2>
                <h4 className='espera'>Su solicitud esta siendo procesada</h4>
            </div>
        )
    }
};

export default ItemListContainer