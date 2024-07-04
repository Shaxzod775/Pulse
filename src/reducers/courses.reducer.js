// Define action types
const ADD_COURSE = "ADD_COURSE";
const DELETE_COURSE = "DELETE_COURSE";

// Action creators
const addCourse = (newCourse) => ({
  type: ADD_COURSE,
  payload: newCourse,
});

const deleteCourse = (courseId) => ({
  type: DELETE_COURSE,
  payload: courseId,
});

// Define reducer function
const coursesReducer = (state, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return [...state, action.payload];
    case DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload);
    default:
      return state;
  }
};

// Export action creators and reducer
export { addCourse, coursesReducer, deleteCourse };
