import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext';



const NavBar = () =>{

    const { cart, contarItems } = useContext(CartContext)
    const navigate = useNavigate();
    const { loged, logOut, setLoged } = useAuth();

    const signOut = async ()=>{
        try{
            await logOut()
            setLoged(false)
        }catch(err){
            !loged && navigate('/login')
            console.log(err)
        }
    }

    useEffect(()=>{
        !loged && navigate('/login')
    },[loged])

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
                    {loged && 
                    <NavLink 
                    to = {`/category/consolas`} className = {"after"}
                    >Consolas
                    </NavLink>
                    }
                    {loged && 
                    <NavLink 
                    to = {`/category/computadoras`} className = {"after"}
                    >Computadoras
                    </NavLink>
                    }
                    {loged && 
                    <NavLink 
                    to = {`/category/celulares`} className = {"after"}

                    >Celulares
                    </NavLink>
                    }


                    {cart.length > 0 && (<NavLink to = {`/cart`} className = {"after"}><CartWidget size ="1.3rem"/> </NavLink>) }
                    {cart.length > 0 && (<p className='cart-number'>{contarItems()}</p>)}

                    {loged && <button className={"after"} onClick={signOut} >Log Out</button>}
                    
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;