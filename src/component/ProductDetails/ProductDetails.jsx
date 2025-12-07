import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import toast from "react-hot-toast"
import Slider from 'react-slick';

export default function ProductDetails() {

 let {id} =  useParams();
 let [details, setDetails] = useState(null) 

let {addProductToCart} = useContext(cartContext);

async function addProductItem(Id){
    let response = await addProductToCart(Id);
    console.log('response' , response); 
    if(response.data.status == 'success'){
      toast.success(response.data.message);
    }
    else{
       toast.error(response.data.message);
    }  
    
  }

 function getProductDetails(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then( (response)=>{ console.log(response.data.data)
    setDetails(response.data.data)
   

  } )
  .catch( ()=>{} )
 }
 

 useEffect( ()=>{
  getProductDetails()
 } , [] )
 
 
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <div className='d-flex flex-wrap justify-content-center align-items-center my-3 gap-4'>
      <div className='w-25'>
        <Slider {...settings}>
            {details?.images.map( (item)=>{
              return <img src={item} alt='image1234' className="w-100"/>
            } )}
        </Slider>
      </div>

      <div className='w-50'>
        <h1>{details?.title}</h1>  
        <p>{details?.description}</p>
        <p>{details?.category.name}</p>

        <div className='d-flex flex-wrap justify-content-between my-2' >
        <span>{details?.price} EGP </span>
        <span> <i className='fas fa-star text-warning '></i> {details?.ratingsQuantity}</span>
        </div>

        <button onClick= {()=>{addProductItem(details?.id)}} className='btn btn-info text-white w-100 p-2 '>Add To Cart</button>
      </div>

    </div>
  )
}

