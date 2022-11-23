import React, { useContext, useEffect, useState } from 'react'
import { ProductoCard } from './components/ProductoCard'
import AppContext from '../../../context/AppContext'
import { NavBar } from '../../Layouts/NavBar'
import { obtenerProductos } from '../../../services/products'
import './styles.css'
import { OffCanvasCarrito } from '../../Layouts/OffCanvasCarrito'
import { Footer } from '../../Layouts/Footer'

export const Productos = ({setIsAuth}) => {

    const { state, addToCart } = useContext(AppContext);

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    const handleCart = item => {
        addToCart(item)
    }

    useEffect(() => {
        console.log("Se ejecuta");
        setTimeout( () => {
            obtenerProductos().then(data => setProducts(data))
        }, 500)
    }, [reload])

    return (
        <>
            <NavBar setIsAuth={setIsAuth}/>
            <section id='productos'>
                <div className="container p-lg-5 p-3">
                    <div className="row d-flex align-items-center justify-content-center">
                        {
                            products.length === 0 && <p>Cargando ...</p>
                        }
                        {
                            products.map((producto, i) => (

                                producto.stock > 0 &&
                                <ProductoCard key={i}
                                    addToCart={handleCart}
                                    data={producto}
                                    index={i}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
            <OffCanvasCarrito setReload={setReload} reload={reload} />
            <Footer />
        </>
    )
}
