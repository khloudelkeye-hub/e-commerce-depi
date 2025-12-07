import React, { useContext, useEffect , useState } from 'react'
import { cartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';

export default function Carts() {

  let {getProductToCart,updateProductInCart,deleteProductFromCart} = useContext(cartContext);

  let [cartProducts,setCartProducts] = useState([])
  let [cartId, setCartId] = useState(null);

 async function getProduct(){
    let response = await getProductToCart();
    console.log("res = " , response)
    console.log('response' , response.data.data);
    setCartProducts(response.data.data)
    setCartId(response?.data?.data?._id);

   
  }

    useEffect( ()=>{
    getProduct()
  } , [] )


   async function updateProduct(Id,count){
    let response = await updateProductInCart(Id,count);
    console.log('response' , response?.data?.data);
    setCartProducts(response?.data?.data)
  }

   async function deleteProduct(Id){
    console.log(Id);
    let response = await deleteProductFromCart(Id);
    console.log('response' , response?.data?.data);
    setCartProducts(response?.data?.data)
  }


  return (
    <>

  <section className="h-100">

    {
      cartProducts?.products?.length > 0 ?
      <>
          <div className="container h-100 py-4">
          <div className="row d-flex justify-content-around align-items-start">
            <div className="col-9">
        
            {/* header section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i className="fas fa-angle-down mt-1" /></a></p>
                </div>
              </div>
              
              {/* show products */}
              { cartProducts?.products?.map( (item)=>{
                return <div className="card rounded-3 mb-4">
                <div className="card-body p-2">
                  <div className="row d-flex justify-content-between align-items-center">

                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img src={item?.product?.imageCover} className="img-fluid rounded-3" alt={item?.product?.title} />
                    </div>

                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item?.product?.title}</p>
                      <p><span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey</p>
                    </div>

                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button onClick={()=>{updateProduct(item?.product?.id, item?.count-1)}} data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i className="fas fa-minus" />
                      </button>
                      <input id="form1" min={0} name="quantity" value={item?.count} type="number" className="form-control form-control-sm" />
                      <button onClick={()=>{updateProduct(item?.product?.id, item?.count+1)}} data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i className="fas fa-plus" />
                      </button>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">{item?.price} EGP </h5>
                    </div>

                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a onClick={()=>{deleteProduct(item?.product?.id)}} href="#!" className="text-danger"><i className="fas fa-trash fa-lg" /></a>
                    </div>
                  </div>
                </div>
              </div>
              } )
                      
              }


              <div className="card">
                <div className="card-body">
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                </div>
              </div>

            </div>

            {/* summary card */}

             <div className=" col-3">
                <div className="card cart-summary card-body mt-5">
                  <h5 className="card-title mb-4 text-success text-center">Order Summary</h5>
                  <p className='text-center'><span className='fw-bold'>Total Price: </span>{cartProducts?.totalCartPrice} EGP </p>
                  <Link to = {`/checkout/${cartProducts?._id}`} ><button className="btn btn-success w-100 my-4">Proceed to Checkout</button></Link>
                </div>
             </div>

          </div>
        </div>
      </>
      :
      <h1 className='text-success text-center my-5 '>There is no data</h1>
    }

  </section>


    </>
  )
}

