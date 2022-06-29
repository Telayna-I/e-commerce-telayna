import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";


const NavBar = () =>{

    const { cart, contarItems } = useContext(CartContext)
    const [categories, setCategories] = useState([]);

    const { loged, logOut, setLoged } = useAuth();


    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }

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
        <header>
        <NavLink to = {`/`} className = "logo">Work-Shop</NavLink>
            <nav ref={navRef}>
                {loged &&
                        <NavLink className = {"nav-link"}
                        to = {`/`}
                        onClick={showNavBar}
                        >Home
                        </NavLink>
                }
                
                {loged && categories.map(cat => <NavLink key={cat.id} className = {"nav-link"} onClick={showNavBar} to={`/category/${cat.id}`}> {cat.description}</NavLink>)}

                {cart.length > 0 && loged && (<NavLink to = {`/cart`} className = {"after"}><CartWidget size ="1.3rem"/> </NavLink>) }
                
                {cart.length > 0 && loged && (<p className='cart-number'>{contarItems()}</p>)}

                {loged && <div className={"log-out nav-link"} onClick={signOut}  >Logout</div>}
                    

                <button className='nav-btn nav-close-btn' onClick={showNavBar} > <MdOutlineClose/> </button>
            </nav>
            <button className='nav-btn' onClick={showNavBar} > <FaBars/> </button>
        </header>
    );
    
}

export default NavBar;