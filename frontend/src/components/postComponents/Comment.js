import React from 'react'

import { useState, useEffect } from "react";
import { useSelector,useDispatch  } from 'react-redux'
import { createComment,getCommentsForPost, reset } from '../../features/post/postSlice'

const Comment = ({commentId, currentComment, setCurrentComment}) => {

  setCurrentComment(commentId)

  // handling post comments
  const { comments } = useSelector(
    (state) => state.post
  )

  // console.log(comments)


  const [finalComments,setFinalComments] = useState([])

  useEffect(()=>{

    comments.map((storeComment)=>{
      if(storeComment._id == commentId){
       console.log(storeComment)

       setFinalComments(storeComment)
       console.log(finalComments)
        
      }
    })
      

  },[comments])

  
  //

  return (
    <>
    {/* comments */}
          <div class="pb-5 flex justify-start items-center">
            
            {/* avatar */}
            <div class="avatar pr-5 ">
                <div class="md:w-10 w-8 mask mask-squircle">
                    <img src="https://api.lorem.space/image/face?hash=92048"/>
                </div>
            </div>
              
            {/* comment */}
            <h3 class="w-full text-lg p-2 rounded-xl resize-none border-solid border-2 border-base-200 bg-base-200 h-full"
            >

              {finalComments.text}
            </h3>
              
          </div>
    </>
  )
}

export default Comment