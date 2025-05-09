import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

export const studentAttendanceSlice = createSlice({
    name: "studentAttendance",
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.data = action.data
        }
    }
})

export const { setValue } = studentAttendanceSlice.actions

export default studentAttendanceSlice.reducer

