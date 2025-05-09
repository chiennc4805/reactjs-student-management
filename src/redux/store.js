import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./slice/searchSlice"
import studentAttendanceReducer from "./slice/studentAttendanceSlice"


export default configureStore({
    reducer: {
        search: searchReducer,
        studentAttendance: studentAttendanceReducer
    },
})