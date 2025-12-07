import React, { useContext, useEffect, useState } from 'react'
import image from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import { cartContext } from '../../context/cartContext';

export default function Navbar() {

  let {cartNumber,getProductToCart} = useContext(cartContext)
  let {isLogin,setLogin} = useContext(userContext);
  let navigate = useNavigate();

  
  async function getProduct(){
      await getProductToCart()
  }

  useEffect( ()=>{
    getProduct()
  } )

  
  function logOut(){
    localStorage.removeItem('userToken');
    setLogin(null);  //modify isLogin 
    navigate('/login')
  }


  return (
    <>
       <nav className='bg-dark-subtle px-3 shadow-sm'>
         <div className='d-flex flex-column flex-lg-row justify-content-between'> 
           <div className='logo d-flex flex-column flex-lg-row'>
             <img src={image} alt="logo_image" width={100} />
             {
              isLogin ?
              <ul className='list-unstyled d-flex flex-column flex-lg-row pt-3'>
               <li> <NavLink to={''} className= 'text-decoration-none px-2 text-dark'> Products </NavLink>  </li>
               <li> <NavLink to={'brands'} className= 'text-decoration-none px-2 text-dark'> Brands </NavLink>  </li>
               <li> <NavLink to={'carts'} className= 'text-decoration-none px-2 text-dark position-relative'> Carts 
               <span className='position-absolute top-0 start-100 bg-warning rounded-circle text-dark badge translate-middle'>{cartNumber}</span> </NavLink></li>
              </ul> : null
             }    

           </div>


            <div className='social'>
              <ul className='list-unstyled d-flex flex-column flex-lg-row pt-3'>
                {!isLogin? 
                  <>
                    <li><NavLink to={'register'} className= 'text-decoration-none px-2 text-dark'>Register</NavLink></li>
                    <li><NavLink to={'login'} className= 'text-decoration-none px-2 text-dark' >Login</NavLink></li>
                    <li className='px-2'>
                      <i className='fab fa-facebook'></i>
                      <i className='fab fa-youtube'></i>
                      <i className='fab fa-instagram'></i>
                    </li>
                  </>
                  :
                  <li className='px-2 text-dark'><span onClick={()=>{logOut()}}>LogOut</span></li>
                  
                }
                
              </ul>             
            </div>
         </div>
       </nav>
    </>
  )
}

