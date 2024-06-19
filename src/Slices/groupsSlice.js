import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Core/api";

const initialState = {
  groups: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const responce = await api.get("groups/");
  return responce.data;
});

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("groupData", JSON.stringify(groupData));

      const response = await api.post("groups/create", formData, {
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

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupId) => {
    const groupIdQuoted = `"${groupId}"`;
    const response = await api.post("groups/delete", groupIdQuoted);
    return response.data;
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCHING GROUPS
      .addCase(fetchGroups.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched groups to the array
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // CREATING GROUP
      .addCase(createGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups.push(action.meta.arg); // Add the new group to the state array
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error message from rejectWithValue
      })
      // DELETING GROUP
      .addCase(deleteGroup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted group from the state
        const index = state.groups.findIndex(
          (group) => group.id === action.meta.arg
        );
        if (index !== -1) {
          state.groups.splice(index, 1);
        }
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { postAdded, postUpdated, postReacted } = coursesSlice.actions;

export const selectAllGroups = (state) => state.groups.groups;
export const selectGroupById = (groupId) => (state) =>
  state.groups.groups.find((group) => group.id === groupId);
export const selectGroupsStatus = (state) => state.groups.status;
export const selectGroupsIdName = (state) =>
  state.groups.groups.map((group) => ({
    id: group.id,
    name: group.name,
  }));
export const selectAllGroupNames = (state) =>
  state.groups.groups.map((group) => group.name);

export default groupsSlice.reducer;
