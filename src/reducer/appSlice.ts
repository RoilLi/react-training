import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type AppState = {
  sidebarCollapsed: boolean
}

const slice = createSlice({
  name: 'app',
  initialState: { sidebarCollapsed: false } as AppState,
  reducers: {
    toggleSideBar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    }
  },
})

export const { toggleSideBar } = slice.actions

export default slice.reducer

export const selectSidebarCollapsed = (state: RootState) => state.app.sidebarCollapsed