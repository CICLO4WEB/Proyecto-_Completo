import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext';
import { parseJwt } from '../../helpers/destructure-jwt';
import { realizarCompraAPI } from '../../services/products';
import { ItemCarrito } from '../pages/Client/components/ItemCarrito'

export const OffCanvasCarrito = ({ setReload, reload }) => {

    const { state, removeFromCart, clearCart } = useContext(AppContext);
    const [warn, setWarn] = useState({ ok: false, msg: "", type: "" })

    const finalizarCompra = () => {
        const { uid, rol } = parseJwt(localStorage.getItem("lico-token"));
        realizarCompraAPI(uid, state.cart, state.total)
            .then(resp => {
                if (resp.ok) {
                    setWarn({ ...resp, type: "success" });
                    clearCart();
                    setReload( !reload );
                }
                else {
                    setWarn({ ok: true, msg: "Hubo un error al realizar la compra", type: "danger" })
                }

                setTimeout(() => { setWarn({ ok: false, msg: "", type: "" }) }, 3500)
            })
    }

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title d-flex align-items-center" id="offcanvasExampleLabel">
                    <b>TOTAL</b>
                    <p style={{ borderBottom: "3px solid #0b5ed7" }} className='px-2 m-0 ms-3'>${Number(state.total).toLocaleString('en', 'US')}</p>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {
                    warn.ok &&
                    <div className={`alert alert-${warn.type}`} role="alert">
                        {warn.msg}
                    </div>
                }
                <div className="row">
                    {state.cart.map((product, index) => <ItemCarrito key={index} index={index} data={product} removeFromCart={removeFromCart} />)}
                </div>
                {
                    state.cart.length > 0
                        ?
                        <button className='btn btn-success w-100 mt-3' onClick={finalizarCompra}>Finalizar compra</button>
                        : <h6 className='text-center'>No hay productos</h6>

                }
            </div>
        </div>
    )
}
