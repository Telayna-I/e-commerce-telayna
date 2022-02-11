import './Nav.css'
import CartWidget from '../CartWidget/CartWidget.js'



const NavBar = () =>{
    return(
        <header className ="topheader">
            <nav className ="topnav">
                <a href ="#" className ="logo">
                    Work-Shop
                </a>
                <ul className ="menu">
                    <li className='menu-item'><a className ="after" href="#home">Home</a></li>
                    <li className='menu-item'><a className ="after" href="#consolas">Consolas</a></li>
                    <li className='menu-item'><a className ="after" href="#computadoras">Computadoras</a></li>
                    <li className='menu-item'><a className ="after" href="#celulares">Celulares</a></li>
                    <li className='menu-item c'><a className='cart' href="#cart"><CartWidget size="1.3rem"/></a>4</li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;