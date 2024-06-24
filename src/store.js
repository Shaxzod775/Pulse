import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Slices/coursesSlice";
import teachersReducer from "./Slices/teachersSlice";
import groupsReducer from "./Slices/groupsSlice";
import studentsReducer from "./Slices/studentsSlice";

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     users: usersReducer,
//   },
// })

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    teachers: teachersReducer,
    groups: groupsReducer,
    students: studentsReducer,
  },
});
