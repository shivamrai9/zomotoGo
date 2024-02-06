import React, { createContext, useContext, useReducer } from 'react'


const CartStateContext = createContext();
const CartDispatchcontext = createContext();

const reducer = (state,action) => {
    switch(action.type) {
        case "ADD":
            return [...state,{
                id:action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                img:action.img
            }]
            default:
                // console.log(action);
                return state
    }
}

export const CartProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,[]);

    return(
        <CartDispatchcontext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchcontext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchcontext)