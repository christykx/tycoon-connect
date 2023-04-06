import {createContext, useState} from 'react'

export const  PostInfoContext=createContext(null)   

 function PostInfo({children}){
    
const [postInfo,setPostInfo]=useState()

    return(
        <PostInfoContext.Provider value={{postInfo,setPostInfo}}>
            {children}
        </PostInfoContext.Provider>
    )

}

export default PostInfo
