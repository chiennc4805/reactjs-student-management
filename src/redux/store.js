import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./slice/searchSlice"

export default configureStore({
    reducer: {
        search: searchReducer,
    },
})