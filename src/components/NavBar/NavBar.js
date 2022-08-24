import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../app/reducers/AuthSlice/authSlice';
import { contarItems } from '../../app/reducers/CartSlice/cartSlice';


const NavBar = () =>{

    const [categories, setCategories] = useState([]);


    const { loged } = useSelector(state => state.auth)
    const { carrito, length } = useSelector(state => state.cart)

    const dispatch = useDispatch()


    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }

    const signOut = ()=>{
        dispatch(logOut())
    }


    useEffect(() => {
        getDocs(collection(db, 'categories')).then(response => {
            const categories = response.docs.map(cat => {
                return { id: cat.id, ...cat.data()}
            })
            setCategories(categories)
        })
        dispatch(contarItems(carrito))
    }, [carrito])
    
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

                {carrito.length > 0 && loged && (<NavLink to = {`/cart`} className = {"after"}><CartWidget size ="1.3rem"/> </NavLink>) }
                
                {carrito.length > 0 && loged && (<button className='cart-number'>{length}</button>)}

                {loged && <div className={"log-out nav-link"} onClick={signOut}  >Logout</div>}
                    

                <button className='nav-btn nav-close-btn' onClick={showNavBar} > <MdOutlineClose/> </button>
            </nav>
            <button className='nav-btn' onClick={showNavBar} > <FaBars/> </button>
        </header>
    );
    
}

export default NavBar;