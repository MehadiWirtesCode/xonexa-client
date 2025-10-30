import { createContext, useState } from "react";

export const AllProductDataContext = createContext();

export const AllProductProvider = ({children}) =>{

     const [products,setProducts] = useState([]);
     const [allProducts, setAllProducts] = useState([]);
     const [gridLoader,setGridLoader] = useState(false);
     const [newestProducts, setNewestProducts] = useState([]);
     const [topProducts, setTopProducts] = useState([]);

     const [newestProductLoader,setNewestProductLoader] = useState(false)
     return(
        <AllProductDataContext.Provider value={
            {products,setProducts,allProducts,
            setAllProducts,gridLoader,setGridLoader
            ,newestProductLoader,setNewestProductLoader,
             newestProducts,setNewestProducts
            ,topProducts, setTopProducts}
            }>
                
            {children}
        </AllProductDataContext.Provider>
     )
}
