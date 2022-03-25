import React from 'react'
import Map from 'react-map-gl';
import { useState } from "react";

import {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

const Post = ({post, showModal, setShowModal,currentPost, setCurrentPost,newPlace, setNewPlace}) => {


  const [viewport, setViewport] = useState({
        zoom: 8
    });

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const updateOnClick = ()=>{
    setShowModal(true)
    setCurrentPost(post)
    setNewPlace(null)

  }


  return (
    <div class="xl:grid xl:grid-cols-3 flex gap-6 w-full xl:h-96 grid-rows-4 p-4 bg-base-100 shadow-xl card card pt-10 pr-10 pl-10 mt-5">

        <div class="col-span-1 row-span-3 text-center p-2 card rounded-none h-60">
            <Map
                    initialViewState={{
                        longitude: post.longitude,
                        latitude: post.latitude,
                        zoom: 4
                    }}
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
        <div class="col-span-2 p-1 flex place-items-center ">
          
          {/* avatar */}
          <div class="avatar pr-5">
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
              <li><a>Delete</a></li>
            </ul>
          </div>

        </div>

        <div class="col-span-2 p-1 -mt-6 flex">

          <h3>{post.description}         
             </h3>

        </div>

        <div class="col-span-2 p-1 flex place-items-center justify-between">

          <h3 class=""><b>{Date(post.date)}</b> <br/>
                      by Biman 
            (Dhaka to Kathmandu)</h3>

          <h3>Airline logo</h3>

        </div>



        <div class="col-span-3 flex place-items-center ">

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">Like</button>

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Comment</button>

          <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Share</button>

        </div>

        
    </div>
  )
}

export default Post