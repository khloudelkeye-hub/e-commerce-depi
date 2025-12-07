import axios from "axios";
import { createContext, useState } from "react";

let headers = {
    token: localStorage.getItem('userToken')
}


export let cartContext = createContext();

export default function CartContextProvider(props){
    
let [cartNumber , setCartNumber] = useState(0)

// add product in API

function addProductToCart(Id){
        return axios.post( `https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: Id },
            { headers: headers }
        )
        .then((response)=>{console.log("response",response)
           setCartNumber(response.data.numOfCartItems) 
           return response
        })
        .catch((error)=>error) 
    }  

// get product from API to Carts.jsx

    function getProductToCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:headers} )
            .then((response)=>{
                setCartNumber(response.data.numOfCartItems)
                return response
        })
            .catch((error)=>error)
        
    }

// update product in API

    function updateProductInCart(Id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, 
            {count:count},
            {headers:headers},
             )
            .then((response)=>{
                setCartNumber(response.data.numOfCartItems)
                return response
            })
            .catch((error)=>error)
        
    }


// delete product from API

    function deleteProductFromCart(Id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, 
            {headers:headers}
            )
            .then((response)=>{
                setCartNumber(response.data.numOfCartItems)
                return response
            })
            .catch((error)=>error)
        
    }

    return <cartContext.Provider value={{ addProductToCart , getProductToCart , updateProductInCart , deleteProductFromCart , cartNumber}}>

    { props.children }

   </cartContext.Provider>

}

