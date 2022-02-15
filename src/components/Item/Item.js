import ItemCount from "../ItemCount/ItemCount";
import './Item.css'

const Item = ( {product } )=>{

    const Agregar = (numero) =>{
        console.log(`Agregue ${numero} ${product.name}`)
    };

    return(
        <div className = "card">
            <h2 className = "card-title">{product.name}</h2>
            <img src = {product.img} className = "card-img"></img>
            <h4 className = "price" ><span>$ {product.price}</span></h4>
            <ItemCount total = {product.stock} inicial = {1} onAdd = {Agregar} />
        </div>
    );
};


export default Item