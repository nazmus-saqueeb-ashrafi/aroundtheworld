import React from 'react'
import Map from 'react-map-gl';

const Post = () => {
  return (
    <div class="xl:grid xl:grid-cols-3 flex gap-6 w-full xl:h-96 grid-rows-4 p-4 bg-base-100 shadow-xl card card pt-10 pr-10 pl-10 mt-5">

        <div class="col-span-1 row-span-3 text-center p-2 card rounded-none h-60">
            <Map
                    initialViewState={{
                        longitude: 23.8103,
                        latitude: 44.57875,
                        zoom: 10
                    }}
                    // style={{width: "w-full", height: 250}}
                    attributionControl="none"
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                    

                />
        </div>
        <div class="col-span-2 p-1 flex place-items-center">

          <div class="avatar pr-5">
              <div class="md:w-10 w-8 mask mask-squircle">
                  <img src="https://api.lorem.space/image/face?hash=92048"/>
              </div>
          </div>
          
          <h3>Maluha is feeling good at Sibui. Maluha is feeling good at Sibui.</h3>

        </div>

        <div class="col-span-2 p-1 flex place-items-center">

          <h3>Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui. Maluha is feeling good at Sibui.          
             </h3>

        </div>

        <div class="col-span-2 p-1 flex place-items-center justify-between">

          <h3 class=""><b>Arrived 12 Feb 2022</b> <br/>
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