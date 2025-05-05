import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    student: null,
    teacher: null,
    parent: null,
    subject: null,
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetValue: (state) => {
            state.student = null
            state.teacher = null
            state.parent = null
            state.subject = null


        },
        assignSearchValue: (state, action) => {
            state.student = action.payload.student || null
            state.teacher = action.payload.teacher || null
            state.parent = action.payload.parent || null
            state.subject = action.payload.subject || null

        }
    }
})

export const { resetValue, assignSearchValue } = searchSlice.actions

export default searchSlice.reducer

