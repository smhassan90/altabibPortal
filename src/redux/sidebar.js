import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebar: true,
  title: 'DashBoard',
  width: '420px',
  isMobileMenuOpen: false
}

export const sidebarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    openSideBar: (state,action) => {
      state.sidebar = !state.sidebar;
      if(state.sidebar === false){
        state.width = '64px'
      }else {
        state.width = '400px';
      }
    },
    navbarTitle: (state,action) => {
      state.title = action.payload
    },
    toogleMobile:(state,action)=>{
      if(action.payload){
        state.isMobileMenuOpen = action.payload
      }else{
        state.isMobileMenuOpen = !state.isMobileMenuOpen
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { openSideBar,navbarTitle , toogleMobile} = sidebarSlice.actions

export default sidebarSlice.reducer