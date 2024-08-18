import secureLocalStorage from "react-secure-storage";
import { create } from "zustand";

export const useGlobal = create((set, get) => ({
  authenticated: secureLocalStorage.getItem("auth") ? true : false,
  auth: secureLocalStorage.getItem("auth")
    ? secureLocalStorage.getItem("auth")
    : {},

  login: (auth) => {
    secureLocalStorage.setItem("auth", auth);
    set(() => ({
      authenticated: true,
      auth: auth,
    }));
  },

  logout: () => {
    secureLocalStorage.clear();
    set(() => ({
      authenticated: false,
      auth: {},
    }));
  },
}));
