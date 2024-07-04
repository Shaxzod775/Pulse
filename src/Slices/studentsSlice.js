import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Core/api";

const initialState = {
  students: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "courses/fetchStudents",
  async () => {
    const responce = await api.get("students");
    return responce.data;
  }
);

export const createStudent = createAsyncThunk(
  "courses/createStudent",
  async (studentData, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("studentData", JSON.stringify(studentData));

      const response = await api.post("students/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchStudents());
      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStudent = createAsyncThunk(
  "courses/editStudent",
  async (studentData, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("studentData", JSON.stringify(studentData));

      const response = await api.post("students/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchStudents());
      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "courses/deleteStudent",
  async (studentId) => {
    const studentIdQuoted = `"${studentId}"`;
    const response = await api.post("students/delete", studentIdQuoted);
    return response.data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCHING STUDENTS
      .addCase(fetchStudents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched courses to the array
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // CREATING STUDENT
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // EDITING STUDENT
      .addCase(editStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // DELETING STUDENT
      .addCase(deleteStudent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted course from the state
        const index = state.students.findIndex(
          (student) => student.id === action.meta.arg
        );
        if (index !== -1) {
          state.students.splice(index, 1);
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { postAdded, postUpdated, postReacted } = coursesSlice.actions;

export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (studentId) => (state) =>
  state.students.students.find((student) => student.id === studentId);
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsIdName = (state) =>
  state.students.students.map((student) => ({
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    middleName: student.middleName,
  }));
export const selectStudentsIdNameCombined = (state) =>
  state.students.students.map((student) => ({
    id: student.id,
    name: `${student.lastName} ${student.firstName} ${student.middleName}`,
  }));
export const selectStudentsName = (state) =>
  state.students.students.map(
    (student) =>
      `${student.lastName} ${student.firstName} ${student.middleName}`
  );

export default studentsSlice.reducer;
