import './nav.css'

const NavBar = () =>{
    return(
        <header className ="topheader">
            <nav className ="topnav">
                <a href="#" className ="logo">
                    Work-Shop
                </a>
                <ul className ="menu">
                    <li><a className ="after" href="#home">Home</a></li>
                    <li><a className ="after" href="#consolas">Consolas</a></li>
                    <li><a className ="after" href="#computadoras">Computadoras</a></li>
                    <li><a className ="after" href="#celulares">Celulares</a></li>
                    <li><a href="#"><i className ="far fa-moon"></i></a></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;