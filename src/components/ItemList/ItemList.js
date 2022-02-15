import Item from "../Item/Item"


const ItemList = ( { products } )=>{
    return(
        <div className = "products">
            {products.map((product)=>(
                <Item product = {product} key = {product.id}/>
            ))}
        </div>
    );
};


export default ItemList