import './Nav.css'
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
                    
                    {/* <li className='menu-item'><a className ="after" href="#home">Home</a></li>
                    <li className='menu-item'><a className ="after" href="#consolas">Consolas</a></li>
                    <li className='menu-item'><a className ="after" href="#computadoras">Computadoras</a></li>
                    <li className='menu-item'><a className ="after" href="#celulares">Celulares</a></li>
                     */}
                    <li className='menu-item c'><a className='cart' href="#cart"><CartWidget size="1.3rem"/></a>4</li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;