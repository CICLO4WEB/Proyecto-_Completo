import axios from 'axios';
import { URL } from './linkAPI';


export const obtenerVentas = async () => {

    return axios.get(`${URL}users/ventas`)
    .then( resp => resp.data )
    .catch( err => err.response.data );

} 

export const login = async payload => {

    return axios.post(`${URL}users/login`, payload)
    .then( resp => resp.data )
    .catch( err => err.response.data );

}

export const createUser = async payload => {

    return axios.post(`${URL}users/create`, payload)
    .then( resp => resp.data )
    .catch( err => err.response.data );

}