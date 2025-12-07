import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import toast from "react-hot-toast"
import CategorySlider from "../CategorySlider/CategorySlider"

export default function Products() {

  let {addProductToCart} = useContext(cartContext);

  async function addProductItem(Id) {
    let response = await addProductToCart(Id);
    console.log('response', response); 
    if(response.data.status == 'success'){
      toast.success(response.data.message);
    }
    else{
       toast.error(response.data.message);
    }
  }

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true)


  function getProducts(){
     axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then( (response)=>{ console.log(response.data.data)
        setProducts(response.data.data)
        setLoading(false)

      if(response.data.status=='success'){
          toast.success(response.data.message)
        }
      else{
           toast.error(response.data.message)
          }
       } )

      .catch( (error)=>{ console.log(error)
        setLoading(false)
       } )
    }

    useEffect( ()=>{

      getProducts();

    } , [])

 
  return (
    <div className='home'>
    <div className='container'> 
      <h2 className="text-secondary py-4">Shop Popular Category</h2>
      <CategorySlider/>
      <h2 className="text-secondary py-4">All Products</h2>

      {/* here, show all products */}
      
        {!isLoading?
        <div className='row g-4'>
         {products.map( (productInfo)=>{
          return(
            
            <div className='col-lg-3'>
              <div className='card p-3 h-100 rounded-4 styleProduct'>

                <Link to={`/productDetails/${productInfo.id}`}>
                  <img src = {productInfo.imageCover} alt= {productInfo.title} className='w-100' />
                  <span className='text-info d-block'> {productInfo.category.name} </span>
                  <span className='d-block'> {productInfo.title.split(' ').slice(0,3).join(' ')} </span>
                  
                  <div className='d-flex justify-content-between my-2'>
                    <span> {productInfo.price} EGP </span>
                    <span> <i className="fas fa-star text-warning"></i> {productInfo.ratingsQuantity} </span>
                  </div>
                </Link>

                <button onClick= {()=>{addProductItem(productInfo.id)}} className='btn bg-info text-white p-2 m-2 w-100'>Add To Cart</button>

              </div>

           </div>
        
            
          )
         } ) 
       }
       </div>

       :
       
       <Loader className='vh-100'/>
      }


        
     </div>
     </div>
  )

}

