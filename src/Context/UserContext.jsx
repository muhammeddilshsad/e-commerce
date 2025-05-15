import { createContext, useState } from "react";
export const Mycontext=createContext()
export const Myprovider=({children})=>{

const [cart,setCart]=useState([])

    return(

        <Mycontext.Provider value={{cart,setCart}}>
            {children}


        </Mycontext.Provider>



    )
}