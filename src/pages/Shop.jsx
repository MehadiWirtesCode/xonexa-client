import { useContext, useEffect } from "react";
import { AllProductDataContext } from "../components/allProductDataConext/allProductConext";
import axios from "axios";
import {ProductFilter} from '../components/ShopComponents.jsx/ProductFilter'
import { useLocation } from "react-router-dom";

export const Shop =() => {

const {setAllProducts,setProducts,allProducts,setGridLoader} = useContext(AllProductDataContext);
const location = useLocation();

const searchParams = new URLSearchParams(location.search);
const category = searchParams.get(`category`);

useEffect(() =>{    
      
  if(!category && allProducts.length > 0) return;

     setGridLoader(true);
     
     if(!category){
       axios.get(`${import.meta.env.VITE_PRODUCT_URL}/getallproducts`)
       .then(res=>{
         setProducts(res.data.products);
         console.log(res.data.message);
         setAllProducts(res.data.products);
       })

       .catch(() =>{
        console.log("something wen wrong when get all data");
       })
      .finally(() => {        
          setGridLoader(false); 
      });
     }

     else{
        axios.get(`${import.meta.env.VITE_PRODUCT_URL}/${category}`)
       .then((res) =>{
     setGridLoader(false)
     setProducts(res.data.products);
     console.log(res.data.message);
     })

 .catch((err) =>{
    console.log("Failed to load products",err);;
 })
     }

},[category])


  return (  
    <>
     <ProductFilter/>  
    </>
  )
}
