import React from 'react'
import { useDimensions } from "../../useDimentions"

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"

import { useRef, useState } from "react";

import Modal from "../profilePageComponents/Modal";
import ModalHeader from "../profilePageComponents/ModalHeader";

import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, reset } from '../../features/post/postSlice'



const ExpandedPostMaker = ({showModal,setShowModal}) => {

    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);


    const [viewport, setViewport] = useState({
    
        zoom: 6
    });

    const [newPlace,setNewPlace]= useState(null)

    const [description, setDescription] = useState("")


    const onChange = (e)=>{
        setDescription(e.target.value)
    }

    

    const handleMapClick = (e)=>{

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

    const { user,post } = useSelector(
        (state) => state.post
    )

    //

    const handlePostClick = ()=>{

        if(description && newPlace.lat && newPlace.long){
            console.log(description)
            console.log(newPlace.lat)
            console.log(newPlace.long)

            const post = 
                {
                    description : description,
                    longitude : newPlace.long,
                    latitude : newPlace.lat,
                    
                }

            // create post 
            dispatch(createPost(post,user))

            setShowModal(false)
            window.location.reload();
        }


    }
    

  return (
      
    <>
        
            <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

                {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100" >

                <ModalHeader toggler={() => setShowModal(false)}/>
                    
                
                <div class="flex justify-start items-center pt-3 pb-4">
                    <div class="avatar pr-5">
                        <div class="md:w-20 w-16 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>
                        </div>
                    </div>
                    <h3>Maluha is feeling good at Sibui.</h3>
                </div>

                
                {/* map */}
                <div class=" card w-full bg-base-100 shadow-xl grid place-items-center mr-5 ml-5 mb-5" ref={constraintsRef}>

                    <input type="text" placeholder="Where did you go?" class="absolute z-10 input input-bordered text-lg w-8/12 rounded-full mb-80 opacity-90"></input>

                    <Map
                        initialViewState={{
                            longitude: 23.8103,
                            latitude: 44.57875,
                            zoom: 3.5
                        }}
                        style={{width: "90vw", height: 400}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                        onDblClick={handleMapClick}
                    >
                        {newPlace&&(
                        <Marker longitude={newPlace.long} latitude={newPlace.lat} anchor="bottom" >
                         <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                        </Marker>
                        )}
                        
           

                    </Map>

                    
                    
                </div>

                <textarea type="text" rows="5" placeholder="Write something about your trip......" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 " onChange={onChange}></textarea>

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
                    newPlace && description?(
                        <button data-modal-toggle="defaultModal" type="button" class="btn btn-info mt-4 mb-2 w-full" onClick={handlePostClick}>Post</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" onClick={handlePostClick}>Post</button>
                        
                    )

                }

                

            </div>

        </Modal>
        
    </>
  )
}


export default ExpandedPostMaker