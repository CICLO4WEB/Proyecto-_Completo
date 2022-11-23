import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseJwt } from '../../helpers/destructure-jwt';
import { useNavigate } from 'react-router-dom'

export const NavBar = ({setIsAuth}) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("lico-token");
        setIsAuth({is:false, rol:""})
        navigate('/auth/login')
    }

    useEffect( () => {
        if ( localStorage.getItem('lico-token') ) {
            const {rol} = parseJwt( localStorage.getItem('lico-token'));
            rol === "ADMIN_ROLE" ? setIsAdmin( true ) : setIsAdmin( false );
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Licorería</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/productos">Productos</Link>
                        </li>
                        {
                            isAdmin ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/productos">Productos</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/ventas">Ventas</Link></li>
                                </ul>
                            </li>
                            :
                            <li className="nav-item">
                                <a className="nav-link" type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Carrito</a>
                            </li>
                        }
                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link btn btn-danger text-white" type='button'>Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
