import { useState } from "react"

const initialState = {
    ventas: [],
    cart: [],
    total: 0
}


const useShoppingCart = () => {

    const [state, setState] = useState(initialState);

    const addToCart = payload => {

        const validation = state.cart.filter( item => item.id === payload.id );

        if ( payload.stock <= validation.length ) return;

        setState({
            ...state,
            cart: [...state.cart, payload],
            total: state.total + payload.price
        });
    };

    const removeFromCart = (payload, indexValue) => {
        setState({
            ...state,
            cart: state.cart.filter((product, index) => index !== indexValue),
            total: state.total - payload.price
        })
    }

    const clearCart = () => {
        setState({
            ...state,
            cart: [],
            total: 0
        })
    }


    return {
        state,
        addToCart,
        removeFromCart,
        clearCart
    }

}

export default useShoppingCart;