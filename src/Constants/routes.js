export const HOME = "/";
export const SIGN_IN = "/sign-in";
export const CABINET = "/cabinet";
export const DASHBOARD = "/dashboard";
export const GROUPS = "/groups";
export const LEADS = "/leads";
export const TEACHERS = "/teachers";
export const STUDENTS = "/students";
export const COURSES = "/courses";
export const PERSONAL = "/personal";
export const NEW = "/new";
<<<<<<< HEAD
export const EDIT = "/edit/:id";
=======
>>>>>>> source-repo/main
export const PROFILE = "/profile/:id";

export function getProfilePath(id) {
  return PROFILE.replace(":id", id);
}
<<<<<<< HEAD

export function getEditPath(id) {
  return EDIT.replace(":id", id);
}
=======
>>>>>>> source-repo/main
