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
                img:action.img,
                price: action.price
            }]
            case "REMOVE":
                let newArr = [...state]
                newArr.splice(action.index,1)
                return newArr
            default:
                console.log("Error in reducer",action.type);
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