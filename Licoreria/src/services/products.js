import axios from "axios";
import { URL } from "./linkAPI"

export const obtenerProductos = async () => {

    return await fetch( `${URL}products`)
    .then( resp => resp.json())
    .then( data => data.products);

}

export const agregarProducto = async (payload ) => {

    return axios.post(`${URL}products/`, payload)
    .then( resp => resp.data)
    .catch( err => err.response.data);

}

export const eliminarProducto = async (id  ) => {

    return axios.delete(`${URL}products/${id}`)
    .then( resp => resp.data)
    .catch( err => err.response.data);

}

export const editarProducto = async (payload, id ) => {

    return axios.put(`${URL}products/${id}`, payload)
    .then( resp => resp.data)
    .catch( err => err.response.data);

}

export const realizarCompraAPI = async ( id, productos, total ) => {

    const data = {
        cantProductos:productos.length,
        total,
        productos
    }

    const productosArr = [];

    // Unir producto repetidos y transformarlos en cantidades
    data.productos.map( (pro, i) => {

        if ( !productosArr.find(item => item.id === pro.id ) ) {
            pro.cant = 1;
            productosArr.push( pro )
        }
        else {
            productosArr.map( item => {
                if ( item.id === pro.id ) {
                    item.cant = item.cant + 1
                }
            })
        }
    })
    data.productos = productosArr;

    return axios.post(`${URL}users/venta/${id}`, data )
    .then( resp => resp.data)
    .catch( error => error.response.data );

}
