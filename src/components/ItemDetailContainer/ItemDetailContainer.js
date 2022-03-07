import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import './ItemDetailContainer.css'
import Spinner from "../Spinner/Spinner";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase'

const ItemDetailContainer = ()=>{


    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState()
    const { productId } = useParams()



    useEffect(() => {

        const docRef = doc(db, 'productos', productId);

        getDoc(docRef).then( response =>{
            const product = {id: response.id, ...response.data()}
            setArticle(product)
        }).catch(err =>{
            console.log('error')
        }).finally(()=>{
            setLoading(false)
        })
    }, [productId])
    

    if(loading === false){
        return(
            <div className = "item-detail-container">
                <ItemDetail item = {article} />
            </div>
        );

    }else{
        return(
                <Spinner/>
        );
    }

};

export default ItemDetailContainer