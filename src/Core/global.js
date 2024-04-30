import { create } from 'zustand'
import { secure } from './secure'

export const useGlobal = create((set, get) => ({

    authenticated: secure.get('auth') ? true : false,
    auth: secure.get('auth') ? secure.get('auth') : {},

    login: (auth) => {
                secure.set('auth', auth)
                set(() => ({
                    authenticated: true,
                    auth: auth
                }))
            },

    logout: () => {
                    secure.clear()
                    set(() => ({
                        authenticated: false,
                        auth: {}
                    }))
                }
}))
