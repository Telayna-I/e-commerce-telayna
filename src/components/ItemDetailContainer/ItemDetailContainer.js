import { getProduct } from "../../Mock/Products";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css'

const ItemDetailContainer = ()=>{


    const [article, setArticle] = useState([])

    useEffect(() => {
        getProduct
        .then((res) =>{
            setArticle(res);
        })
        .catch(()=>{
            console.log('error');;
        })
        .finally(() =>{
            // se ejecuta siempre y al final.
        })
    }, [])
    


    return(
        <div className = "item-detail-container">
            <ItemDetail item = {article} />
        </div>
    );
};

export default ItemDetailContainer