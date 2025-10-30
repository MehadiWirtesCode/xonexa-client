import { createContext,useState } from "react";

export const CartDataContext = createContext();

export const CartDataProvider =({children})=>{

    const [totalCartItem,setTotalCartItem] = useState(0);
    return(
        <CartDataContext.Provider value={{totalCartItem,setTotalCartItem}}>
            {children}
        </CartDataContext.Provider>
    )
}