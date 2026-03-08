// store/useThemeStore.ts
import { create } from 'zustand'

type ThemeStore = {
    theme: string
    themeType: boolean
    setTheme: (val: string) => void
    setThemeType: (val: boolean) => void
    changeTheme: () => void
}
export const useTheme = create<ThemeStore>()((set) => ({
    theme: 'light',
    themeType: false,
    setTheme: (newTheme) => set(() => ({
        theme: newTheme,
        themeType: newTheme === 'dark'
    })),
    setThemeType: (newType) => set(() => ({
        themeType: newType,
        theme: newType ? 'dark' : 'light'
    })),
    changeTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
        themeType: !state.themeType
    })),
}))