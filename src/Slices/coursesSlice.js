import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Core/api";

const initialState = {
  courses: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const responce = await api.get("courses");
    return responce.data;
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));

      const response = await api.post("courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId) => {
    const courseIdQuoted = `"${courseId}"`;
    const response = await api.post("courses/delete", courseIdQuoted);
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCHING COURSES
      .addCase(fetchCourses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched courses to the array
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // CREATING COURSE
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses.push(action.meta.arg); // Add the new course to the state array
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // DELETING COURSE
      .addCase(deleteCourse.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted course from the state
        const index = state.courses.findIndex(
          (course) => course.id === action.meta.arg
        );
        if (index !== -1) {
          state.courses.splice(index, 1);
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { postAdded, postUpdated, postReacted } = coursesSlice.actions;

export const selectAllCourses = (state) => state.courses.courses;
export const selectCourseById = (courseId) => (state) =>
  state.courses.courses.find((course) => course.id === courseId);
export const selectCoursesStatus = (state) => state.courses.status;
export const selectCoursesIdName = (state) =>
  state.courses.courses.map((course) => ({
    id: course.id,
    name: course.name,
  }));
export const selectAllCourseNames = (state) =>
  state.courses.courses.map((course) => course.name);
export const selectCourseByName = (courseName) => (state) =>
  state.courses.courses.find((course) => course.name === courseName);

export default coursesSlice.reducer;
