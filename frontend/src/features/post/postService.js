import axios from 'axios'

const API_URL = '/api/posts/'

// Get timeline posts for user
// @route   GET /api/posts/timeline/all
const getTimelinePosts = async (userData) => {

  const token = userData.token
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const response = await axios.get(API_URL + 'timeline/all', config)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

  return response.data
}


// Create post
// @route   POST /api/posts
const createPost = async (postData,token) => {

  console.log(token)
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


  const response = await axios.post(API_URL , postData,config)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

  return response.data
}


// Update post
// @route   PUT /api/posts/:id
const updatePost = async ( postId, post, token) => {

  console.log(token)
  
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.put(API_URL + postId , post, config)

  return response.data
}

const postService = {
  getTimelinePosts, 
  createPost,
  updatePost
  
}

export default postService