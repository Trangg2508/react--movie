import { createSlice } from "@reduxjs/toolkit";

const LIKE_LOCAL_STORAGE_KEY = "likeList";

const likeSlice = createSlice({
    name: 'favourite',
    initialState: {
        likeItem: JSON.parse(localStorage.getItem(LIKE_LOCAL_STORAGE_KEY)) || [],
    },
    reducers: {
        addToList: (state, action) => {
            const newItem = { ...action.payload };
            const updatedList = [...state.likeItem, newItem];
            localStorage.setItem(LIKE_LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
            return { ...state, likeItem: updatedList };

        },
        removeFromList: (state, action) => {
            const movieID = action.payload;
            const updatedList = state.likeItem.filter(item => item.id !== movieID);
            localStorage.setItem(LIKE_LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
            return { ...state, likeItem: updatedList };
            
        }
    }
   
});

export const { addToList, removeFromList } = likeSlice.actions;
export default likeSlice.reducer;