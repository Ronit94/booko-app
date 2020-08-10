import { createSlice } from '@reduxjs/toolkit';
export const userReducer = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    userLogin: state => {
      console.log(state.value)
      if(state.value.isLogin){
        state.value.isLogin = true
      }
    },
    userLogoff: state => {
      if(state.value.isLogin){
        state.value.isLogin = false
      }
    },
    setUserData: (state, action) => {
      state.value = action.payload;
    }
  },
});




export const { userLogin, userLogoff, setUserData } = userReducer.actions;

export const setUserDataAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(setUserData(amount));
  }, 1000);
};

export const userinfo = state => state.counter.value;

export default userReducer.reducer;
