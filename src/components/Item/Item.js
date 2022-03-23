import './Item.css'
import { Link } from 'react-router-dom'


const Item = ( { product } )=>{

    return(
        // <div className = "card">
        //     <h2 className = "card-title">{product.name}</h2>
        //     <img src = {product.img} className = "card-img"></img>
        //     <h4 className = "price" ><span>$ {product.price}</span></h4>
        //     <Link className="detalle" to={`/detail/${product.id}`} >Ver detalles</Link>
        // <div/>
        <div class="card">
            <div class="imgBox">
                <img src={product.img} alt="item-cart" class="imagen"/>
            </div>
            <div class="contentBox">
                <Link to={`/detail/${product.id}`} class="buy">Detalles</Link>
            </div>
        </div>
    );
};


export default Item