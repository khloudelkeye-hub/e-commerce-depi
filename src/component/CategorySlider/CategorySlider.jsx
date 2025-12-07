import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';


export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  let [category , setCategory] = useState([]);

  function getCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then( (response)=>{ 
      console.log('response_Of_category' , response.data.data)
      setCategory(response.data.data) 
    } )
   
    .catch( ()=>{} )
  }


  useEffect( ()=>{
    getCategories();
  } , [])



  return (

     <Slider {...settings}>
          
          {
              category.map( (item)=>{
                return (
                <div>
                  <img src={item.image} alt={item.name} className='category-img'/>
                  <p className='text-center mt-3'>{item.name}</p>
                </div>
                    )
              } )
          }
    
    </Slider>
  )
}

