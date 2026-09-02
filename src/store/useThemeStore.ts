import { create } from 'zustand';
import type { Theme } from '@emotion/react';
import { emeraldTheme, riverBlueTheme } from '../theme/theme';
import { storage } from '../services/storage';

interface ThemeState {
  currentTheme: Theme;
  themeName: 'emerald' | 'river-blue';
  setTheme: (name: 'emerald' | 'river-blue') => Promise<void>;
  initTheme: () => Promise<void>;
}

const THEME_KEY = 'ottie_selected_theme';

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: emeraldTheme,
  themeName: 'emerald',

  initTheme: async () => {
    const saved = await storage.get(THEME_KEY);
    if (saved === 'river-blue') {
      set({ currentTheme: riverBlueTheme, themeName: 'river-blue' });
    } else {
      set({ currentTheme: emeraldTheme, themeName: 'emerald' });
    }
  },

  setTheme: async (name) => {
    await storage.set(THEME_KEY, name);
    set({
      currentTheme: name === 'river-blue' ? riverBlueTheme : emeraldTheme,
      themeName: name,
    });
  },
}));
