import React, { useContext, useState } from 'react'
import img from '../../assets/images/register.png'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userContext } from '../../context/userContext';


export default function Register() {

  let [apiError , setError] = useState('');
  let [isLoading , setLoading] = useState(false);
  let navigate = useNavigate();
  let {setLogin} = useContext(userContext);

  async function handleRegister(formData) {

    setLoading(true);

    console.log('register' , formData);
    await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signup' , formData )
      .then( (response)=>{ console.log('success' , response) 

        if(response.data.message == 'success'){
          localStorage.setItem('userToken' , response.data.token);
          setLogin(response.data.token);
          setLoading(false);
          navigate('/login')
        }
      } )
      
      .catch( (error)=>
      { console.log('error' , error.response.data.message) 
       setLoading(false);
       setError(error.response.data.message)
      } )    
  }


// Validation on form

let validationSchema = Yup.object( {
  
  name: Yup.string().required('name is required').min(3 , 'min length is 3').max(10 , 'max length is 10'),
  email: Yup.string().required('email is required').email('enter valid email'),
  phone: Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/ , 'phone is not valid'),
  password: Yup.string().required('password is required').matches( /^[A-Z][a-z0-9]{6,8}$/ , 'password is not valid' ),
  rePassword: Yup.string().required('confirm password is required').oneOf( [Yup.ref('password')] ),

} )


let formik = useFormik( {
  initialValues: {
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
  } ,
  validationSchema : validationSchema ,
  onSubmit : handleRegister
} )



return (
  <>
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center">
                  <a href="#!">
                    <img src={img} alt="BootstrapBrain Logo" width="200" height="100"/>
                  </a>
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                
                {
                  apiError? 
                          <div className='text-danger bg-danger-subtle p-3 rounded-2 mb-3'> {apiError} </div>
                          : null   
                }

                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className = {`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ""} `} name="name" value={formik.values.name} id="name" placeholder="name" required/ >
                        <label htmlFor="name" className="form-label"> Name </label>
                        {
                          formik.touched.name && formik.errors.name ? (
                            <div className='text-danger'> {formik.errors.name} </div>
                          ) : null                          
                        }
            
                      </div>
                    </div>


                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ""}`} name="email" value={formik.values.email} id="email" placeholder="name@example.com" required/>
                        <label htmlFor="email" className="form-label"> Email </label>

                        {
                          formik.touched.email && formik.errors.email ? (
                            <div className='text-danger'> {formik.errors.email} </div>
                          ) : null                          
                        }

                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ""}`} name="password" value={formik.values.password} id="password" placeholder="Password" required/>
                        <label htmlFor="password" className="form-label"> Password </label>
                        
                        {
                          formik.touched.password && formik.errors.password ? (
                            <div className='text-danger'> {formik.errors.password} </div>
                          ) : null                          
                        }

                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ""}`} name="rePassword" value={formik.values.rePassword} id="rePassword" placeholder="rePassword" required/>
                        <label htmlFor="rePassword" className="form-label"> rePassword </label>
                       
                        {
                          formik.touched.rePassword && formik.errors.rePassword ? (
                            <div className='text-danger'> {formik.errors.rePassword} </div>
                          ) : null                          
                        }

                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ""}`} name="phone" value={formik.values.phone} id="phone" placeholder="phone" required/>
                        <label htmlFor="phone" className="form-label"> phone </label>

                        {
                          formik.touched.phone && formik.errors.phone ? (
                            <div className='text-danger'> {formik.errors.phone} </div>
                          ) : null                          
                        }
                        
                      </div>
                    </div>

                    
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-danger btn-lg" type="submit" disabled={ !(formik.isValid && formik.dirty) }>
                          
                          { isLoading? <i className='fa fa-spinner text-white fa-spin'></i> : '' } Register Now 
                          
                          </button>
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>

  )
}

