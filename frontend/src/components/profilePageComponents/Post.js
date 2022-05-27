import React from 'react'
import Map from 'react-map-gl';
import { useState, useEffect } from "react";

import {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createComment,getCommentsForPost, reset } from '../../features/post/postSlice'

import Comment from '../postComponents/Comment'

const Post = ({post, showModal, setShowModal,currentPost, setCurrentPost,newPlace, setNewPlace, showDeleteModal, setShowDeleteModal,showCommentDeleteModal,setShowCommentDeleteModal, currentComment,setCurrentComment}) => {

  // const [comment, setComment] = useState('');

  const [viewport, setViewport] = useState({
        zoom: 8
    });

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  //
  const [viewState,setViewState]= useState({
    
    longitude: post.longitude,
    latitude: post.latitude,
    zoom: 4
                    
  })

  const updateOnClick = ()=>{
    setShowModal(true)

    setCurrentPost(post)

    // setViewState({
    //   longitude: post.longitude,
    //   latitude: post.latitude,
    //   zoom: 4

    // })


    setNewPlace(null)

  }

  // useEffect(()=>{

  //   setViewState({
  //     longitude: post.longitude,
  //     latitude: post.latitude,
  //     zoom: 4

    
  // },[showModal])


  const deleteOnClick = () =>{
      setCurrentPost(post)
      setShowDeleteModal(true)
  }

  //

  //

  const commentDeleteOnClick = ()=>{

    console.log(currentComment)
    setShowCommentDeleteModal(true)

  }

  //
  const [comment,setComment] = useState({
    length:0,
    value:"",

  })


  // 
  console.log(comment.value)
  console.log(comment.length)
  
  const [textareaRows,setTextareaRows] = useState(1)

  useEffect(()=>{

    if(comment.length > 79){
      setTextareaRows(4)
    }else{
      setTextareaRows(1)

    }

  },[comment])

   // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector(
    (state) => state.post
  )


  const handleEnterCommentClick = ()=>{
        // create 
        console.log(comment.value)
         console.log(post._id)


      
            const commentData = 
            {
                text : comment.value,
                postId: post._id
            
            }

    
            // create comment
            dispatch(createComment(commentData))

            
            window.location.reload();  // this reload is unwanted
        

    }

  
    useEffect(()=>{
      // grab comments from post and store in slice
      dispatch(getCommentsForPost(post._id))

    },[post])


  const postComments = post.comments
  .map((comment)=>{

    
    return(
      <>

        <div class="flex">

          <Comment commentId = {comment} currentComment={currentComment} setCurrentComment={setCurrentComment} />

        {/* triple dot dropdown for comment */}
          <div class="dropdown dropdown-hover">
           
              <button class="btn btn-ghost btn-circle ">

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 23 5">
                  <g id="Group_1" data-name="Group 1" transform="translate(-1547 -727)">
                    <circle id="Ellipse_21" data-name="Ellipse 21" cx="2.5" cy="2.5" r="2.5" transform="translate(1547 727)" fill="#a7adb9"/>
                    <circle id="Ellipse_22" data-name="Ellipse 22" cx="2.5" cy="2.5" r="2.5" transform="translate(1556 727)" fill="#a7adb9"/>
                    <circle id="Ellipse_23" data-name="Ellipse 23" cx="2.5" cy="2.5" r="2.5" transform="translate(1565 727)" fill="#a7adb9"/>
                  </g>
                </svg>

              </button>
            
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-24">
              {/* <li onClick={updateOnClick}><a>Update</a></li> */}
              <li onClick={commentDeleteOnClick} ><a>Delete</a></li>
            </ul>
          </div>


        </div>
        
      </>

    )
              
  })

  

  return (
    <div class="xl:grid xl:grid-cols-3 flex gap-6 w-full grid-rows-8 p-4 bg-base-100 shadow-xl card pt-10 pr-10 pl-10 mt-5 items-start">

        <div class="col-span-1 row-span-3 text-center p-2 card rounded-none h-60">
            <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    onRender={evt => setViewState(viewState)}

                    // onLoad={evt => setViewState(evt.viewState)}
                    // style={{width: "w-full", height: 250}}
                    attributionControl="none"
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                    

                >

                  
                  <Marker longitude={post.longitude} latitude={post.latitude} anchor="bottom" >
                    <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                  </Marker>
                        
                
                </Map>
        </div>

        <div class="col-span-2 p-1 flex place-items-center h-10 ">
          
          {/* avatar */}
          <div class="avatar pr-5 ">
              <div class="md:w-10 w-8 mask mask-squircle">
                  <img src="https://api.lorem.space/image/face?hash=92048"/>
              </div>
          </div>
          
          {/* title */}
          <h3 class="grow">{post.title}</h3>
          
          {/* triple dot dropdown */}
          <div class="dropdown dropdown-end dropdown-hover">
           
              <button class="btn btn-ghost btn-circle ">

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 23 5">
                  <g id="Group_1" data-name="Group 1" transform="translate(-1547 -727)">
                    <circle id="Ellipse_21" data-name="Ellipse 21" cx="2.5" cy="2.5" r="2.5" transform="translate(1547 727)" fill="#a7adb9"/>
                    <circle id="Ellipse_22" data-name="Ellipse 22" cx="2.5" cy="2.5" r="2.5" transform="translate(1556 727)" fill="#a7adb9"/>
                    <circle id="Ellipse_23" data-name="Ellipse 23" cx="2.5" cy="2.5" r="2.5" transform="translate(1565 727)" fill="#a7adb9"/>
                  </g>
                </svg>

              </button>
            
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
              <li onClick={updateOnClick}><a>Update</a></li>
              <li onClick={deleteOnClick}><a>Delete</a></li>
            </ul>
          </div>

        </div>

        <div class="col-span-2 p-1 -mt-6 flex h-30">

          <h3>{post.description}         
             </h3>

        </div>

        <div class="col-span-2 p-1 flex place-items-center justify-between h-10">

          <h3 class=""><b>{Date(post.date)}</b> <br/>
                      by Biman 
            (Dhaka to Kathmandu)</h3>

          <h3>Airline logo</h3>

        </div>



        <div class="col-span-3 row-start-4 flex place-items-center mt-2 h-10 ">

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">Like</button>

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Comment</button>

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Share</button>

        </div>
        

        
        <div class="col-span-3 row-start-5 row-span-4">

  
          {/* comments */}
          { postComments.length > 0 && postComments }
          
          

          {/* make a comment */}
          {/* 50 rows */}
          <textarea type="text" rows={textareaRows} placeholder="Write a comment..." class="input w-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 h-full" value={comment.value} onChange={(e)=>{
            setComment({ 
              length: e.target.value.split('').length,
              value: e.target.value,
           })

          }}
          
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              console.log('enter')
              console.log(comment.value)
              handleEnterCommentClick(comment.value)

              //post comment
            }
          }}>
            
          </textarea>

        </div>
        
        
    </div>

    

    
  )
}

export default Post