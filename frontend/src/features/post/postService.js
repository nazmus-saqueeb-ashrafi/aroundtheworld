import axios from 'axios'

const API_URL = '/api/posts/'

// Get timeline posts for user
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

const postService = {
  getTimelinePosts, 
  
}

export default postService