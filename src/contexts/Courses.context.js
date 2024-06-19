import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { coursesReducer } from "../reducers/courses.reducer";

// Define initial state
const initialState = [
  {
    id: uuidv4(),
    name: "Javascript",
    duration: 3,
    price: 1000000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Python",
    duration: 4,
    price: 1200000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Backend",
    duration: 7,
    price: 2200000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "UI/UX",
    duration: 3,
    price: 1000000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Game dev",
    duration: 8,
    price: 2500000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Machine Learning",
    duration: 12,
    price: 3200000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Data science",
    duration: 12,
    price: 4200000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "Flutter",
    duration: 6,
    price: 1800000,
    thumbnail: null,
  },
  {
    id: uuidv4(),
    name: "AI",
    duration: 6,
    price: 2000000,
    thumbnail: null,
  },
  // Add more initial courses if needed
];

// Create context
const CoursesContext = createContext();
const CoursesDispatchContext = createContext();

// Create context provider
export const CoursesProvider = ({ children }) => {
  const [courses, dispatch] = useReducer(coursesReducer, initialState);

  // Function to find a course by ID
  const findCourseById = useCallback(
    (courseId) => {
      return courses.find((course) => course.id === courseId);
    },
    [courses]
  );

  const findCourseByName = useCallback(
    (courseName) => {
      return courses.find((course) => course.name === courseName);
    },
    [courses]
  );

  const getCourseNames = useCallback(
    (courses) => {
      return courses.map((course) => course.name);
    },
    [courses]
  );

  const allCourseNames = useMemo(() => getCourseNames(courses), [courses]);

  // Define context value using useMemo
  const contextValue = useMemo(
    () => ({
      courses,
      allCourseNames,
      findCourseByName,
      findCourseById,
      getCourseNames,
    }),
    [courses]
  );

  return (
    <CoursesContext.Provider value={contextValue}>
      <CoursesDispatchContext.Provider value={dispatch}>
        {children}
      </CoursesDispatchContext.Provider>
    </CoursesContext.Provider>
  );
};

// Custom hook to use the context
export const useCourses = () => useContext(CoursesContext);
export const useCoursesDispatch = () => useContext(CoursesDispatchContext);
