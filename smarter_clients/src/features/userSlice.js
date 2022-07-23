import { createSlice } from '@reduxjs/toolkit'


// Currently Not using this//////////////////////////////////////////

const initialState = {
  name:"",
  email: "",
  phone: "",
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.phone = action.payload.phone
    },
    unsetUserInfo: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.name = action.payload.name
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer