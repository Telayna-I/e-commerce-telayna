import './ItemListContainer.css'

const ItemListContainer = (props) =>{

    const { greeting } = props;

    return(
        <h2>{greeting}</h2>
    )
} 

export default ItemListContainer