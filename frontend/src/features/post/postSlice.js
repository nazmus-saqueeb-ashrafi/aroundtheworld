import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const timelinePosts = []

const initialState = {
  user: user ? user : null,
  timelinePosts: timelinePosts ? timelinePosts : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get timeline posts for user
export const getTimeLinePosts = createAsyncThunk(
    'post/timelinePosts',
    async (user, thunkAPI) => {

      try {
      
      console.log(postService.getTimelinePosts(user))
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
      .addCase(getTimeLinePosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTimeLinePosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.timelinePosts = action.payload
      })
      .addCase(getTimeLinePosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelinePosts = null
      })
   }
})

export const { reset } = postSlice.actions
export default postSlice.reducer