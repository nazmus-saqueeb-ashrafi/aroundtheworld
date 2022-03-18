import Sidebar from '../components/dashboardComponents/Sidebar'
import MessengerSideBar from '../components/dashboardComponents/MessengerSideBar'
import Nav from '../components/dashboardComponents/Nav'
import { useState, useEffect } from 'react';


import ExpandedPostMaker from '../components/profilePageComponents/ExpandedPostMaker';
import Post from '../components/profilePageComponents/Post';
import UnExpandedPostMaker from '../components/profilePageComponents/UnExpandedPostMaker';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTimeLinePosts, reset } from '../features/post/postSlice'


export default function Dashboard() {

  // redux

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user,timelinePosts } = useSelector(
    (state) => state.post
  )

  
  useEffect(()=>{

    // make sure user is logged in
    if(!user){
      navigate('/login')
    }

    // grab timeline posts from user
    dispatch(getTimeLinePosts(user))
    

  },[user,navigate])


  // iterate thru timeline posts
  const posts = timelinePosts.map((post)=>{

    return(
      <>
        <Post post={post}/>
      </>

    )
              
  })
  

  // const [dark,setDark] = useState('dark')

  // const window = document.querySelector(".window");

  // useEffect(() => {
  //   const darkMode = ()=>{
  //     window.classList.toggle(dark);
  //   }

  //   darkMode()

  // },[setDark])

  const [showModal, setShowModal] = useState(false);


  return (
    
    
    <div class='window dark'>


      {/* nav bar */}
      <div class="sticky top-0 z-50">
        <Nav />
      </div>
      
  
      
      {/* body */}
      <div className='bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-base-100 h-screen' >
        {/* <div class="p-5 max-w-sm mx-auto bg-white rounded-xl shadow-xl flex items-center space-x-4">
          <div>
            <div class="text-xl font-medium text-black">ChitChat</div>
            <p class="text-slate-500">You have a new message!</p>
          </div>
        </div> */}
        
        {/* sidebar */}
        {/* <div class="absolute  ">
          <Sidebar/>
        </div> */}

        <div class="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1">

          <div class="top-10 left-0 fixed">
            <Sidebar/>
          </div>

          <div class="top-10 right-0 fixed">
            <MessengerSideBar/>
          </div>
          
          <div class="xl:col-start-2 xl:col-span-3 lg:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-8/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full">

            {/* 'unexpanded post' card */}
            <UnExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>

            <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

            {/* post */}
            {posts}
    

          </div>

        </div>


        {/* 'expanded post' card */}
        <div class="grid place-items-center">
            <ExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>

        </div>

      </div>
    

    </div>
    
    
    
  )
}

