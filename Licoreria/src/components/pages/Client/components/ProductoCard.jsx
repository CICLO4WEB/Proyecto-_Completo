import React from 'react'
import { MdShoppingCart } from 'react-icons/md'

export const ProductoCard = (props) => {

    const { data, addToCart } = props;
    const handleAdd = payload => {
        const data = {
            id: payload._id,
            name: payload.nombre,
            description: payload.descripcion,
            stock: payload.stock,
            price: payload.price, 
        }
        addToCart( data );
    }

    return (
        <div className="card mb-2 col-lg-5 col-sm-12 m-2">
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center">
                    <img src={data.img} className="img-fluid rounded-start" alt={`Image for ${data.name}`} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{data.nombre}</h5>
                        {
                            data.descripcion ? 
                            <p className="card-text">{ data.descripcion }</p>
                            :
                            <p className='card-text'>No hay descripción</p>
                        }
                        <h6>$ {Number(data.price).toLocaleString('en', 'US')}</h6>
                        <button
                        onClick={() => handleAdd(data)} 
                        className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Agregar <MdShoppingCart className='ms-2'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
