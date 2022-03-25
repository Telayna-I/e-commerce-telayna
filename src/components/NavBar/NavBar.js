import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';



const NavBar = () =>{

    const { cart, contarItems } = useContext(CartContext)
    const [categories, setCategories] = useState([]);

    const { loged, logOut, setLoged } = useAuth();

    const signOut = async ()=>{
        try{
            await logOut()
            setLoged(false)
        }catch(err){
            console.log(err.code)
        }
    }

    useEffect(() => {
        getDocs(collection(db, 'categories')).then(response => {
            const categories = response.docs.map(cat => {
                return { id: cat.id, ...cat.data()}
            })
            setCategories(categories)
        })
    }, [])


    return(
        <header className ="topheader">
            <nav className ="topnav">
                <NavLink to = {`/`} className = "logo">Work-Shop</NavLink>
                <ul className ="menu">
                    {loged &&
                    <NavLink className = {"after"}
                    to = {`/`} 
                    >Home
                    </NavLink>
                    }

                    {loged && categories.map(cat => <NavLink key={cat.id} to={`/category/${cat.id}`}> {cat.description}</NavLink>)}


                    {cart.length > 0 && loged && (<NavLink to = {`/cart`} className = {"after"}><CartWidget size ="1.3rem"/> </NavLink>) }
                    {cart.length > 0 && loged && (<p className='cart-number'>{contarItems()}</p>)}

                    {loged && <div className={"log-out"} onClick={signOut} >Logout</div>}
                    
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;