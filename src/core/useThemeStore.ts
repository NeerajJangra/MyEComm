import { create } from 'zustand';
import { lightTheme, darkTheme, THEME_TYPES } from '../constants/theme';

type ThemeType = 'light' | 'dark';

interface ThemeState {
  currentTheme: ThemeType;
  themeColors: typeof lightTheme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: THEME_TYPES.LIGHT,
  themeColors: lightTheme,

  toggleTheme: () => {
    const next = get().currentTheme === THEME_TYPES.LIGHT ? THEME_TYPES.DARK : THEME_TYPES.LIGHT;
    set({
      currentTheme: next,
      themeColors: next === THEME_TYPES.LIGHT ? lightTheme : darkTheme,
    });
  },
}));
