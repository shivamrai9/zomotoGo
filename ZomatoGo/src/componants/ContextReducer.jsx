import React, { createContext, useContext } from 'react'


const CartStateContext = createContext();
const CartDispatchcontext = createContext();

const reducer = (state,action) => {
    
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

export const usecart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchcontext)