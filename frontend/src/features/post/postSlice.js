import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const timelinePosts = []
// const post = null

const initialState = {
  user: user ? user : null,
  timelinePosts: timelinePosts ? timelinePosts : null,
  // post: post ? post : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get timeline posts for user
export const getTimeLinePosts = createAsyncThunk(
    'post/timelinePosts',
    async ( _ , thunkAPI) => {

      try {

      const user = thunkAPI.getState().auth.user
      return await postService.getTimelinePosts(user)

      
    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)


// Create post
export const createPost = createAsyncThunk(
    'post/createPost',
    async (postData, thunkAPI) => {

      try {
      
      const token = thunkAPI.getState().auth.user.token

      return await postService.createPost(postData,token)

      
    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)

// Update post
export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({postId, post}, thunkAPI) => {

      try {
      
      const token = thunkAPI.getState().auth.user.token
      
      console.log(postId)
      console.log(post)
      

      return await postService.updatePost(postId, post, token)

      
    } catch (error) {

      

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)


// Delete post
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, thunkAPI) => {

      try {
      
      const token = thunkAPI.getState().auth.user.token
      
      console.log(postId)
    
      return await postService.deletePost(postId, token)

      
    } catch (error) {

      

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)


// Create comment
export const createComment = createAsyncThunk(
    'post/createComment',
    async (commentData, thunkAPI) => {

      try {
      
      const token = thunkAPI.getState().auth.user.token

      // console.log(text)
      // console.log(postId)
      console.log(commentData)

      return await postService.createComment(commentData, commentData.postId ,token)

      
    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)



export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
   extraReducers: (builder) => {
    builder

      // getTimeLinePosts
      .addCase(getTimeLinePosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTimeLinePosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
    
        state.timelinePosts = action.payload
      })
      .addCase(getTimeLinePosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelinePosts = null
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.timelinePosts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        console.log(action.payload)
        state.timelinePosts.push(action.payload)
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        
        state.timelinePosts = null
      })

      // deletePost
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.timelinePosts.push(action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelinePosts = null
      })

      // createComment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        
        // state.timelinePosts.push = action.payload
        state.timelinePosts.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

        state.timelinePosts = null

      })
   }
})

export const { reset } = postSlice.actions
export default postSlice.reducer