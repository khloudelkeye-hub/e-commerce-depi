import { createContext,useEffect,useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props){

     let [ isLogin , setLogin ] = useState(null);
     
     // during refresh, isLogin = 'userToken' is constant
     
     useEffect( ()=>{
        if(localStorage.getItem('userToken') !== null){
            setLogin(localStorage.getItem('userToken'))  
        }
     } , [] )

    return <userContext.Provider value={ {isLogin,setLogin} }>

        {props.children}

    </userContext.Provider>
}