import React from 'react'
import { useDimensions } from "../../useDimentions"

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"

import { useRef, useState, useEffect } from "react";

import Modal from "../profilePageComponents/Modal";
import ModalHeader from "../profilePageComponents/ModalHeader";

import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, updatePost, reset } from '../../features/post/postSlice'



const ExpandedPostMaker = ({currentPost, setCurrentPost,showModal,setShowModal,initialViewState,setInitialViewState, newPlace, setNewPlace, description, setDescription, updatedPost, setUpdatedPost}) => {

    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);

    const onChange = (e)=>{
        setDescription(e.target.value)
    }

    
    useEffect(()=>{

        // Everytime modal is closed and there is a current post we want map to focus back on the current post when modal is opened once again, instead of the clicked new place last time modal was opened.
        if(!showModal){
            console.log("modal closed")
            if(currentPost){
                setInitialViewState({
                longitude: currentPost.longitude, 
                latitude: currentPost.latitude,
                zoom: 4
                })

                setDescription(currentPost.description)
            }else{
                setDescription('')
            }
            

        }
        //

        

        buttonNamer()
    
  },[showModal])

        
    const [viewport, setViewport] = useState({
        zoom: 6
    });



    
    useEffect(()=>{
        if(currentPost){

            setInitialViewState({
                longitude: currentPost.longitude,
                latitude: currentPost.latitude,
                zoom: 4

            })

            setDescription(currentPost.description)

            setUpdatedPost({
                description : currentPost.description,
                    longitude : currentPost.longitude,
                    latitude : currentPost.latitude
            })
    

            console.log(currentPost)
            console.log(initialViewState)

        }else{
            console.log("no curr post")
            console.log(initialViewState)

            
        

        }
    
  },[currentPost])


  useEffect(()=>{ // for post update
      if(newPlace){
                setUpdatedPost(

                    {
                        description : description,

                        longitude : newPlace.long,

                        latitude : newPlace.lat

                    }
                )
      }

      if(description && !newPlace){

          setUpdatedPost(

                    {
                        description : description,

                        longitude : currentPost?currentPost.longitude:null,

                        latitude : currentPost?currentPost.latitude:null,

                    }
                )
          
      }
        
  },[newPlace,description])
    
    

    // console.log(initialPlace)
    


    const handleMapClick = (e) => {

        // const [lng,lat] = e.lngLat

        const long = e.lngLat.lng
        const lat = e.lngLat.lat

        setNewPlace({
            lat,
            long,
        })

        // console.log(long)
        // console.log(lat)
    }


    // redux
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(
        (state) => state.post
    )

    // const [post,setPost] = useState()

    //
    
    const [text, setText] = useState('Post');
    const buttonNamer = ()=>{
        if(currentPost){
            setText("Update")
        }else{
            setText("Post")
        }
    }

    

    const handlePostClick = ()=>{
        // create


        if(description && newPlace.lat && newPlace.long){
            
            
            const post = 
            {
                description : description,
                longitude : newPlace.long,
                latitude : newPlace.lat,
            }

    
            // create post 
            dispatch(createPost(post,user))

            setShowModal(false)

            // window.location.reload();
        }

        

    }

    const handleUpdatePostClick = () => {
        // update
            
            
        const post = updatedPost
        const postId = currentPost._id

        console.log(post)
        console.log(postId)

        // update post 
        dispatch(updatePost({postId: postId,post}))
        // {leadId: lead._id, leadData}

        setShowModal(false)
        window.location.reload();



    }

    const onModalClose = () =>{
        setShowModal(false)
        setCurrentPost(null)
        
    //    console.log(currentPost)

    }
    

  return (
      
    <>
        
            <Modal size="" id="defaultModal" active={showModal} toggler={onModalClose} aria-hidden="true" >

                {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100" >

                <ModalHeader toggler={onModalClose}/>
                    
                
                <div class="flex justify-start items-center pt-3 pb-4">
                    <div class="avatar pr-5">
                        <div class="md:w-20 w-16 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>
                        </div>
                    </div>
                    <h3>Maluha is feeling good at Sibui. </h3>
                </div>

                
                {/* map */}
                
                <div class=" card w-full bg-base-100 shadow-xl grid place-items-center mr-5 ml-5 mb-5" ref={constraintsRef}>

                    <input type="text" placeholder="Where did you go?" class="absolute z-10 input input-bordered text-lg w-8/12 rounded-full mb-80 opacity-90"></input>

                    <Map
                        {...initialViewState}
                        onMove={evt => setInitialViewState(evt.initialViewState)}
                        style={{width: "90vw", height: 400}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                        onDblClick={handleMapClick}
                    >
                        {newPlace?(
                        <Marker longitude={newPlace.long} latitude={newPlace.lat} anchor="bottom" >
                         <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                        </Marker>
                        ):currentPost?(
                            <Marker longitude={currentPost.longitude} latitude={currentPost.latitude} anchor="bottom" >
                         <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                        </Marker>
                        ):null}

                    </Map>

                </div>

                <textarea type="text" rows="5" placeholder="Write something about your trip..." class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200" value={description} onChange={onChange}></textarea>

                <div class='flex flex-row justify-between items-center xl:p-3 p-1 space-x-3 w-full border-solid border-2 border-base-200 rounded-xl mt-4 pb-1'>

                    <h2 class="basis-1/2 font-medium ml-5">Add to your post</h2>


                    <div class="flex flex-row basis-1/4">

                        <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Photo</button>
                    
                        <button class="flex btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">
                        <span>Mood</span>
                        </button>

                    </div>
                        

                </div>

                {
                    (currentPost && description) || (newPlace && description)?(
                        <button data-modal-toggle="defaultModal" type="button" class="btn btn-info mt-4 mb-2 w-full" onClick={currentPost?handleUpdatePostClick:handlePostClick}>{text}</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" >{text}</button>
                        
                    )

                }

                

            </div>

        </Modal>
        
    </>
  )
}


export default ExpandedPostMaker