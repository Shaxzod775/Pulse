import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Slices/coursesSlice";

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     users: usersReducer,
//   },
// })

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
