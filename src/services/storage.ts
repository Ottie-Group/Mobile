import { Preferences } from '@capacitor/preferences';

const memStorage: Record<string, string> = {};

export const storage = {
  get: async (key: string): Promise<string | null> => {
    try {
      const { value } = await Preferences.get({ key });
      return value;
    } catch (_e) {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return memStorage[key] || null;
    }
  },
  set: async (key: string, value: string): Promise<void> => {
    try {
      await Preferences.set({ key, value });
    } catch (_e) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      } else {
        memStorage[key] = value;
      }
    }
  },
  remove: async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
    } catch (_e) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      } else {
        delete memStorage[key];
      }
    }
  },
};