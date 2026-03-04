import { create } from 'zustand'

import { Cookies } from 'react-cookie'

const cookies = new Cookies()
type Store = {
    groupName: string
    setGroupName: (name: string) => void
}
export const useStore = create<Store>()((set) => ({
    groupName: (() => {
        try {
            const saved = cookies.get('groupName')
            return saved || ' не выбрана'
        } catch (error) {
            return ' не выбрана'
        }
    })(),
    setGroupName: (name: string) => {{cookies.set('groupName', name )} set({ groupName: name })},
}))
