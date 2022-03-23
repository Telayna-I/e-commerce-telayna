import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext';



const NavBar = () =>{

    const { cart, contarItems } = useContext(CartContext)

    const { loged, logOut, setLoged } = useAuth();

    const signOut = async ()=>{
        try{
            await logOut()
            setLoged(false)
        }catch(err){
            console.log(err.code)
        }
    }


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


                    {cart.length > 0 && loged && (<NavLink to = {`/cart`} className = {"after"}><CartWidget size ="1.3rem"/> </NavLink>) }
                    {cart.length > 0 && loged && (<p className='cart-number'>{contarItems()}</p>)}

                    {loged && <div className={"log-out"} onClick={signOut} >Logout</div>}
                    
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;