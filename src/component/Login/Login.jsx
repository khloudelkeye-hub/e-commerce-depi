import React, { useState,useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userContext } from '../../context/userContext';


export default function Login() {

  let [apiError , setError] = useState('');
  let [isLoading , setLoading] = useState(false);
  let navigate = useNavigate();
  let {isLogin,setLogin} = useContext(userContext)

async function handleLogin(formData) {

    setLoading(true);

    console.log('login' , formData);
    await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signin' , formData )
      .then( (response)=>{ console.log('success' , response) 
        if(response.data.message == 'success'){
          localStorage.setItem('userToken' , response.data.token);
          setLogin(response.data.token);
          console.log(isLogin)
          setLoading(false);
          navigate('/')
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
    
  email: Yup.string().required('email is required').email('enter valid email'),
  password: Yup.string().required('password is required').matches( /^[A-Z][a-z0-9]{6,8}$/ , 'password is not valid' ),

} )


  let formik = useFormik( {
    initialValues: {
      email:'',
      password:'',
    } ,

    validationSchema : validationSchema ,
    onSubmit : handleLogin
  } )



return (
  <>
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">

                <h1 className="fs-2 text-center text-muted mb-4">Login Now</h1>
                
                {
                  apiError? 
                          <div className='text-danger bg-danger-subtle p-3 rounded-2 mb-3'> {apiError} </div>
                          : null   
                }

                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">

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
                      <div className="d-grid my-3">
                        <button className="btn btn-danger btn-lg" type="submit" disabled={ !(formik.isValid && formik.dirty) }>
                          
                          { isLoading? <i className='fa fa-spinner text-white fa-spin'></i> : '' } Login Now 
                          
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
