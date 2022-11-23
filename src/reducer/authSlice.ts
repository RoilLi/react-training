import { createSlice } from '@reduxjs/toolkit'
import { api, User } from '../services/authService'
import type { RootState } from '../store'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
