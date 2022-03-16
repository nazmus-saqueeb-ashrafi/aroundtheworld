import React from 'react'

const UnExpandedPostMaker = ({showModal,setShowModal}) => {
  return (
    <>
    <div className='flex justify-start items-center bg-base-100 shadow-xl z-10 pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 rounded-xl'>
        {/* avatar */}
                <div class="avatar pr-10">
                    <div class="md:w-20 w-16 mask mask-squircle">
                        <img src="https://api.lorem.space/image/face?hash=92048"/>
                    </div>
                </div>
                
                {/* buttons */}
                <div class='flex-grow pt-4'>

                    <div class=" btn-outline cursor-pointer rounded-full p-2 bg-slate-600 hover:bg-slate-500 hover:text-slate-50 "  data-modal-toggle="defaultModal" type="button" onClick={(e) => setShowModal(true)}><span class='text-lg pl-3'>Where did you go, Simon?</span></div>


                    <div class='flex justify-center items-center xl:p-3 p-1 space-x-3'>
                        <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">Location</button>

                        <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Photo</button>
                        
                        <button class="flex btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">
                            <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" />
                            </svg>
                            <span>Mood</span>
                        </button>

                    </div>
                    

                </div>



    </div>
                
    </>
  )
}

export default UnExpandedPostMaker