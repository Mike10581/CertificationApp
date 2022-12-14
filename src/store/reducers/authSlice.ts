//https://blog.logrocket.com/handling-user-authentication-redux-toolkit/#organizing-redux-slices-actions

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserDetails, registerUser, loginUser } from './authActions'
// interface IUser {
//   isLoggedIn: boolean
//   role: string
// }

export interface IAuthState {
  // user: IUser
  loading: boolean
  userInfo: { email: string; isLoggedIn: boolean } // for user object
  userToken: string // for storing the JWT
  error: unknown
  success: boolean // for monitoring the registration process.
}

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : ''

const initialState: IAuthState = {
  // user: { isLoggedIn: false, role: '' },
  loading: false,
  userInfo: { email: '', isLoggedIn: false }, // for user object
  userToken: userToken!, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // deletes token from storage
      state.loading = false
      state.userInfo = { email: '', isLoggedIn: false }
      state.userToken = ''
      state.error = null
    },
    setUserData: (state: IAuthState, action: PayloadAction<IAuthState>) => {
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userInfo.isLoggedIn = true
      state.userToken = payload.userToken
    })
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = {}
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true // registration successful
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    })
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false
    })
  },
})

// const login = localStorage.getItem('isLoggedIn')
//    if (!!login) setUser({ isLoggedIn: true, role: users[login].role })

//  const checkUser = (login, password) => password === users[login].password

//  const loginHandler = (login, password) => {
//    const checkUserResult = checkUser(login, password)
//    if (checkUserResult) {
//      localStorage.setItem('isLoggedIn', login)
//      setUser({ isLoggedIn: true, role: users[login].role })
//    }
//  }
//  const logoutHandler = () => {
//    localStorage.removeItem('isLoggedIn')
//    setUser({ isLoggedIn: false, role: '' })
//  }

export const { setUserData, logout } = authSlice.actions

export default authSlice.reducer
