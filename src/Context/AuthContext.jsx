import { createContext, useEffect, useState } from "react";

export let AuthContext= createContext(null);

export default function AuthContextProvider(props){
    
   

    const [userToken, setUserToken] = useState(null)
 
    

 useEffect(()=>{
    if(localStorage.getItem('userToken')){
        setUserToken(localStorage.getItem('userToken'))
    }
 },[])

    return<>
    <AuthContext.Provider value={{userToken , setUserToken}} > {props.children} </AuthContext.Provider>  
    </>
}