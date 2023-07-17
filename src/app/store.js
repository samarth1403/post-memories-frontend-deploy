import {configureStore} from "@reduxjs/toolkit";
import { memoryReducer } from "../features/memory/memorySlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
    reducer : {
      user : userReducer,
      memory : memoryReducer
    },
})