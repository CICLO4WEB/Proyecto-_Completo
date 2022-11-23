import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../../context/AppContext'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { NavBar } from '../../Layouts/NavBar';
import { agregarProducto, editarProducto, eliminarProducto, obtenerProductos } from '../../../services/products';
import { uploadImage } from '../../../helpers/img-cloudinary';

export const ProductosAdmin = ({ setIsAuth }) => {

    const { state } = useContext(AppContext);
    const [alert, setAlert] = useState(false);
    const [reload, setReload] = useState({ ok: false, msg: "", type: "" });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState(0);

    const [img, setImg] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        stock: "",
        price: ""
    })

    const handleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const deleteProduct = async id => {

        const { ok } = await eliminarProducto(id);

        if (ok) {
            setAlert({ ok: true, msg: "Producto eliminado con éxito", type: "primary" })
            setReload(!reload);
        }
        else {
            setAlert({ ok: true, msg: "Hubo un error al eliminar el producto", type: "danger" })
        }

        setTimeout(() => { setAlert({ ok: false, msg: "", type: "" }) }, 3000)
    }

    const handleEdit = (item) => {
        setInputs({
            name: item.nombre,
            description: item.descripcion,
            stock: item.stock,
            price: item.price
        })
        setImg("");
        setId(item._id);
    }

    const editProductForm = async () => {
        const dataForm = {
            nombre: inputs.name,
            descripcion: inputs.description,
            stock: inputs.stock,
            price: inputs.price
        }

        if (!!img) {
            const { data, status } = await uploadImage(img);
            if (status === 200) {
                dataForm.img = data.secure_url;
            }
        };

        setLoading(true);
        const { ok } = await editarProducto(dataForm, id);

        if (ok) {
            setAlert({ ok: true, msg: "Producto actualizado con éxito", type: "success" })
            setReload(!reload);
        }
        else {
            setAlert({ ok: true, msg: "Hubo un error al actualizar el producto", type: "danger" })
        }

        setLoading(false);

        setTimeout(() => { setAlert({ ok: false, msg: "", type: "" }) }, 3000)
    }

    const addProductoForm = async () => {
        const dataForm = {
            nombre: inputs.name,
            descripcion: inputs.description,
            stock: inputs.stock,
            price: inputs.price
        }

        if (!!img) {
            const { data, status } = await uploadImage(img);
            if (status === 200) {
                dataForm.img = data.secure_url;
            }
        };

        setLoading(true);

        const { ok } = await agregarProducto(dataForm);

        if (ok) {
            setAlert({ ok: true, msg: "Producto creado con éxito", type: "success" })
            setInputs({
                name: "",
                description: "",
                stock: "",
                price: ""
            })
            setReload(!reload);
        }
        else {
            setAlert({ ok: true, msg: "Hubo un error al crear el producto", type: "danger" })
        }

        setLoading(false);
        setImg("");

        setTimeout(() => { setAlert({ ok: false, msg: "", type: "" }) }, 3000)
    }

    useEffect(() => {
        obtenerProductos().then(data => setProducts(data))
    }, [reload])

    return (
        <>
            <NavBar setIsAuth={setIsAuth} />
            <div className="container mt-5">
                <div className="row">
                    <button
                        onClick={() => setInputs({
                            name: "",
                            description: "",
                            stock: "",
                            price: ""
                        })}
                        className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modalAgregar">Agregar producto</button>
                </div>
                <div className="row mt-5">
                    {
                        alert.ok &&
                        <div className={`alert alert-${alert.type}`} role="alert">
                            {alert.msg}
                        </div>
                    }
                    {
                        products.length === 0 && <p>Cargando ...</p>
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">STOCK</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">DESCRIPCIÓN</th>
                                <th scope="col">IMAGE</th>
                                <th scope="col">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((pro, i) => (
                                    <tr key={i}>
                                        <th scope="row">{pro.nombre}</th>
                                        <td>{pro.stock}</td>
                                        <td>{pro.price}</td>
                                        <td>{pro.descripcion.slice(0, 50)}...</td>
                                        <td><a className='btn btn-info' target='blank' href={pro.img}>img</a></td>
                                        <td>
                                            <button onClick={() => handleEdit(pro)} data-bs-toggle="modal" data-bs-target="#modalEditar" className='btn btn-primary me-1'><AiFillEdit color='white' /></button>
                                            <button onClick={() => setId(pro._id)} data-bs-toggle="modal" data-bs-target="#modalEliminar" className='btn btn-danger ms-1'><AiFillDelete color='white' /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL AGREGAR */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalAgregar" tabIndex="-1" aria-labelledby="modalAgregar" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAgregar">AGREGAR</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                alert.ok &&
                                <div className={`alert alert-${alert.type}`} role="alert">
                                    {alert.msg}
                                </div>
                            }
                            <form>
                                <div className="mb-3">
                                    <input onChange={e => setImg(e.target.files[0])} name='img' type="file" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                    <input value={inputs.name} onChange={handleInputs} name='name' type="text" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                                    <input value={inputs.description} onChange={handleInputs} name='description' type="text" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Stock</label>
                                            <input value={inputs.stock} onChange={handleInputs} name='stock' type="number" className="form-control" id="exampleFormControlInput1" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Precio</label>
                                            <input value={inputs.price} onChange={handleInputs} name='price' type="number" className="form-control" id="exampleFormControlInput1" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={loading} onClick={addProductoForm}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL EDITAR */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditar" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditar">EDITAR</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                alert.ok &&
                                <div className={`alert alert-${alert.type}`} role="alert">
                                    {alert.msg}
                                </div>
                            }
                            <form>
                                <div className="mb-3">
                                    <input onChange={e => setImg(e.target.files[0])} name='img' type="file" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                    <input value={inputs.name} onChange={handleInputs} name='name' type="text" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                                    <input value={inputs.description} onChange={handleInputs} name='description' type="text" className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Stock</label>
                                            <input value={inputs.stock} onChange={handleInputs} name='stock' type="number" className="form-control" id="exampleFormControlInput1" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Precio</label>
                                            <input value={inputs.price} onChange={handleInputs} name='price' type="number" className="form-control" id="exampleFormControlInput1" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={loading} onClick={editProductForm}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL ELIMINAR */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminar" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminar">ELIMINAR</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Deseas eliminar este producto?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteProduct(id)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
