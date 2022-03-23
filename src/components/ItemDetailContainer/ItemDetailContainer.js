import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import './ItemDetailContainer.css'
import Spinner from "../Spinner/Spinner";
import { getDetail } from '../../services/firebase/firebase'

const ItemDetailContainer = ()=>{


    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState()
    const { productId } = useParams()



    useEffect(() => {
        getDetail(productId).then(response =>{
            setArticle(response)
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