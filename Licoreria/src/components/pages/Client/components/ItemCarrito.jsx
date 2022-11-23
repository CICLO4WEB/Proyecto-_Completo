import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'

export const ItemCarrito = ({ data, index, removeFromCart }) => {
    return (
        <div className="col-12 mt-2">
            <div className="card w-100">
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    {
                        data.description ? <p className="card-text">{data.description.slice(0, 50)}...</p>
                            :
                            <p className="card-text">No hay descripción</p>
                    }
                    <strong className='position-absolute top-0 end-0 text-success'>${Number(data.price).toLocaleString('en', 'US')}</strong>
                    <button className="btn btn-danger" onClick={() => removeFromCart(data, index)}>Eliminar <MdRemoveShoppingCart className='ms-2' /></button>
                </div>
            </div>
        </div>
    )
}
