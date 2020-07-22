import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userState';

export default configureStore({
  reducer: {
    counter: userReducer,
  },
});
