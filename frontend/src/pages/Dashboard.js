import Sidebar from '../components/dashboardComponents/Sidebar'
import MessengerSideBar from '../components/dashboardComponents/MessengerSideBar'
import Nav from '../components/dashboardComponents/Nav'
import { useState, useEffect } from 'react';

import ExpandedPostMaker from '../components/profilePageComponents/ExpandedPostMaker';
import DeletePostModal from '../components/profilePageComponents/DeletePostModal';
import DeleteCommentModal from '../components/profilePageComponents/DeleteCommentModal';
import Post from '../components/profilePageComponents/Post';
import UnExpandedPostMaker from '../components/profilePageComponents/UnExpandedPostMaker';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTimeLinePosts,getCommentsForPost, reset } from '../features/post/postSlice'


export default function Dashboard() {

  // states used to manipulate the map & markers, the modals (try redux maybe)
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [initialViewState,setInitialViewState]= useState({
        
    longitude: 0,
    latitude: 0,
    zoom: 1
                        
  })
  const [newPlace,setNewPlace]= useState(null)

  //

  // states used to update post
    const [description, setDescription] = useState("")
    const [updatedPost, setUpdatedPost] = useState()

  //


  // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { timelinePosts } = useSelector(
    (state) => state.post
  )

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  //

  
  useEffect(()=>{

    // make sure user is logged in
    if(!user){
      navigate('/login')
      
    }

    // grab timeline posts from user
    dispatch(getTimeLinePosts())

    return ()=>{
      dispatch(reset())
    }
    

  },[user, navigate, isError, message, dispatch])

  
  useEffect(()=>{

    //refresh map 
    
  },[showModal])


  // sort and iterate thru timeline posts
  const [arrayForSort,setArrayForSort] = useState([])

  useEffect(()=>{


    if(timelinePosts){
      setArrayForSort([...timelinePosts])
    }else{
      setArrayForSort([])

    }

  
  },[timelinePosts])

  

    const sortedTimelinePosts = arrayForSort.sort(function(a,b){

      console.log(a.updatedAt)
      console.log(b.updatedAt)

      return b.updatedAt.localeCompare(a.updatedAt);  
      

    })

  
  
  const posts = sortedTimelinePosts
  .map((post)=>{

    // grab comments from each post and store in slice
    // dispatch(getCommentsForPost(post._id))

    return(
      <>
        <Post key={post._id} post={post} showModal={showModal} setShowModal={setShowModal} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} currentPost={currentPost} setCurrentPost={setCurrentPost} newPlace={newPlace} setNewPlace={setNewPlace} showCommentDeleteModal={showCommentDeleteModal} setShowCommentDeleteModal={setShowCommentDeleteModal} currentComment={currentComment} setCurrentComment={setCurrentComment} />
      </>

    )
              
  })

  //

  
  // const [dark,setDark] = useState('dark')

  // const window = document.querySelector(".window");

  // useEffect(() => {
  //   const darkMode = ()=>{
  //     window.classList.toggle(dark);
  //   }

  //   darkMode()

  // },[setDark])


  return (
    
    
    <div class='window dark'>


      {/* nav bar */}
      <div class="sticky top-0 z-50">
        <Nav />
      </div>
      
  
      
      {/* body */}
      <div className='bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-base-100 ' >
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

          <div class="top-10 right-0 fixed invisible md:visible">
            <MessengerSideBar/>
          </div>
          
          <div class="xl:col-start-2 xl:col-span-3 lg:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-8/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full">

            {/* 'unexpanded post' card */}
            <UnExpandedPostMaker showModal={showModal} setShowModal={setShowModal} setCurrentPost={setCurrentPost} currentPost={currentPost} initialViewState={initialViewState} setInitialViewState={setInitialViewState} newPlace={newPlace} setNewPlace={setNewPlace}/>

            <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

            {/* post */}
            { posts.length > 0 ? posts: "No timeline posts" }
    

          </div>

        </div>


        {/* 'expanded post' card */}
        <div class="grid place-items-center">
            <ExpandedPostMaker currentPost={currentPost} setCurrentPost={setCurrentPost} showModal={showModal} setShowModal={setShowModal} initialViewState={initialViewState} setInitialViewState={setInitialViewState} newPlace={newPlace} setNewPlace={setNewPlace} description={description} setDescription={setDescription} updatedPost={updatedPost} setUpdatedPost={setUpdatedPost}/>

        </div>

        {/* delete post modal */}
        <div class="grid place-items-center">
            <DeletePostModal currentPost={currentPost} setCurrentPost={setCurrentPost} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} description={description} setDescription={setDescription} updatedPost={updatedPost} setUpdatedPost={setUpdatedPost}/>

        </div>


        {/* delete comment modal */}
        <div class="grid place-items-center">
            <DeleteCommentModal currentComment={currentComment} setCurrentComment={setCurrentComment} showCommentDeleteModal={showCommentDeleteModal} setShowCommentDeleteModal={setShowCommentDeleteModal}/>

        </div>

      </div>
    

    </div>
    
    
    
  )
}

