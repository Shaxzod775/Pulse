import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Core/api";

const initialState = {
  teachers: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  "courses/fetchTeachers",
  async () => {
    const responce = await api.get("teachers");
    return responce.data;
  }
);

export const createTeacher = createAsyncThunk(
  "courses/createTeacher",
  async (teacherData, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("teacherData", JSON.stringify(teacherData));

      const response = await api.post("teachers/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchTeachers());
      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTeacher = createAsyncThunk(
  "courses/editTeacher",
  async (teacherData, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("teacherData", JSON.stringify(teacherData));

      const response = await api.post("teachers/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchTeachers());
      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "courses/deleteTeacher",
  async (teacherId) => {
    const teacherIdQuoted = `"${teacherId}"`;
    const response = await api.post("teachers/delete", teacherIdQuoted);
    return response.data;
  }
);

const teachersSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCHING COURSES
      .addCase(fetchTeachers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched courses to the array
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // CREATING COURSE
      .addCase(createTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // EDITING TEACHER
      .addCase(editTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // DELETING COURSE
      .addCase(deleteTeacher.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted course from the state
        const index = state.teachers.findIndex(
          (teacher) => teacher.id === action.meta.arg
        );
        if (index !== -1) {
          state.teachers.splice(index, 1);
        }
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { postAdded, postUpdated, postReacted } = coursesSlice.actions;

export const selectAllTeachers = (state) => state.teachers.teachers;
export const selectTeacherById = (teacherId) => (state) =>
  state.teachers.teachers.find((teacher) => teacher.id === teacherId);
export const selectTeachersStatus = (state) => state.teachers.status;
export const selectTeachersIdName = (state) =>
  state.teachers.teachers.map((teacher) => ({
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    middleName: teacher.middleName,
  }));
export const selectTeachersIdNameCombined = (state) =>
  state.teachers.teachers.map((teacher) => ({
    id: teacher.id,
    name: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
  }));
export const selectTeachersName = (state) =>
  state.teachers.teachers.map(
    (teacher) =>
      `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`
  );

export default teachersSlice.reducer;
