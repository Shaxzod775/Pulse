import { create } from 'zustand'
import secureLocalStorage from 'react-secure-storage'

export const useGlobal = create((set, get) => ({

    authenticated: secureLocalStorage.getItem('auth') ? true : false,
    auth: secureLocalStorage.getItem('auth') ? secureLocalStorage.getItem('auth') : {},

    login: (auth) => {
                secureLocalStorage.setItem('auth', auth)
                set(() => ({
                    authenticated: true,
                    auth: auth
                }))
            },

    logout: () => {
                    secureLocalStorage.clear()
                    set(() => ({
                        authenticated: false,
                        auth: {}
                    }))
                }
}))
