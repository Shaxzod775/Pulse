import { create } from 'zustand'
import { secure } from './secure'

const useGlobal = create((set, get) => ({ 


    authenticated: false,
    auth: {},

    login: (auth) => {
        secure.set('auth', auth)
        set((state) => ({
            authenticated: true,
            auth: auth
        }))
    },

    logout: () => {
        secure.clear()
        set((state) => ({
            authenticated: false,
            auth: {}
        }))
    },
}))