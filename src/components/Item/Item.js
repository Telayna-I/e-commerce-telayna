import './Item.css'
import { Link } from 'react-router-dom'


const Item = ( { product } )=>{

    return(
        <div className='card'>
            <div className='img-container'>
                <img src={product.img} alt ='product-img'></img>
            </div>
            <h2 className='card-title'>{product.name}</h2>
            <Link className="detalle" to={`/detail/${product.id}`} >Ver detalles</Link>
        </div>
    );
};


export default Item