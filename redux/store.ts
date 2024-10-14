import {configureStore} from '@reduxjs/toolkit'
import userrReducer from './userData/userInfoSlice'

export const reduxStore = configureStore({
    reducer:{
        userrReducer
    }
});

