import { getProduct } from "../../Mock/Products";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import './ItemDetailContainer.css'
import Spinner from "../Spinner/Spinner";

const ItemDetailContainer = ()=>{


    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState()
    const { productId } = useParams()



    useEffect(() => {
        getProduct(productId)
        .then(res =>{
            setArticle(res);
            setLoading(false)
        })
        .catch(err =>{
            console.log('error');;
        })

        return(() =>{
            setArticle()
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
            <div className = "item-detail-container">
                <Spinner/>
            </div>
        );
    }

};

export default ItemDetailContainer