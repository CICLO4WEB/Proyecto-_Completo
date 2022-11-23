import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../../context/AppContext'
import { obtenerVentas } from '../../../services/users';
import { NavBar } from '../../Layouts/NavBar'

export const VentasAdmin = ({setIsAuth}) => {

    const { state } = useContext(AppContext);
    const [ventas, setVentas] = useState([]);
    const [reload, setReload] = useState(false);
    const [productos, setProductos] = useState([])

    useEffect(() => {
        obtenerVentas()
            .then(data => setVentas(data.purchases))
    }, [reload])

    return (
        <>
            <NavBar setIsAuth={setIsAuth} />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Total</th>
                            <th scope="col">Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ventas.map((venta, i) => (
                                <tr key={i}>
                                    <th scope="row">{venta.fecha}</th>
                                    <td>{venta.correo}</td>
                                    <td>{venta.hora}</td>
                                    <td>{venta.total}</td>
                                    <td><button onClick={() => setProductos(venta.productos)} data-bs-toggle="modal" data-bs-target="#productosModal" className='btn btn-primary'>Show</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* MODAL */}
            <div className="modal fade" id="productosModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">PRODUCTOS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                productos.map((pro, i) => (
                                    <div className="col-12" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{pro.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-success">${pro.price}</h6>
                                                <p className="card-text">{pro.description.slice(0, 50)}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}