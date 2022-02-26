import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget.js'
import { NavLink } from 'react-router-dom';



const NavBar = () =>{
    return(
        <header className ="topheader">
            <nav className ="topnav">
            <NavLink to = {`/`} className = "logo">Work-Shop</NavLink>
                <ul className ="menu">
                    <NavLink className = {"after"}
                    to = {`/`} 
                    >Home
                    </NavLink>
                    <NavLink 
                    to = {`/category/consolas`} className = {"after"}
                    >Consolas
                    </NavLink>
                    <NavLink 
                    to = {`/category/computadoras`} className = {"after"}
                    >Computadoras
                    </NavLink>
                    <NavLink 
                    to = {`/category/celulares`} className = {"after"}

                    >Celulares
                    </NavLink>

                    <NavLink 
                    to = {`/cart`} className = {"after"}

                    ><CartWidget size="1.3rem"/>
                    </NavLink>
                    
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;