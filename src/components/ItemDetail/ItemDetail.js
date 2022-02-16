import './ItemDetail.css'

const ItemDetail = ({ item }) =>{



    return(
        <div className = 'detail'>
            <img className = 'img-details' src = {item.img} />
            <div className = 'details'>
                <h2 className = 'title-detail'> {item.name} </h2>
                <p className = 'description-detail' > {item.description} </p>
                <div className = 'price-detail'> Precio: $ {item.price} </div>
                <div className = 'stock-detail'> Stock: {item.stock} unidades </div>
                <div className = 'color-detail'> Color: {item.color} </div>
                <div className = 'category-detail'> Categoria: {item.category} </div>
            </div>
        </div>
    );

}



export default ItemDetail
