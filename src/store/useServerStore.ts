import { create } from 'zustand';
import { storage } from '../services/storage';

interface ServerState {
  serverUrl: string;
  isConfigured: boolean;
  isTesting: boolean;
  connectionStatus: 'idle' | 'connected' | 'error';
  errorMessage: string;

  initServer: () => Promise<void>;
  setServerUrl: (url: string) => Promise<void>;
  testConnection: (url?: string) => Promise<boolean>;
  clearServer: () => Promise<void>;
}

const SERVER_KEY = 'ottie_server_url';
const DEFAULT_URL = 'http://127.0.0.1:8080';

export const useServerStore = create<ServerState>((set, get) => ({
  serverUrl: '',
  isConfigured: false,
  isTesting: false,
  connectionStatus: 'idle',
  errorMessage: '',

  initServer: async () => {
    const saved = await storage.get(SERVER_KEY);
    if (saved && saved.trim()) {
      set({ serverUrl: saved.trim(), isConfigured: true });
      get().testConnection(saved.trim());
    } else {
      set({ serverUrl: '', isConfigured: false });
    }
  },

  setServerUrl: async (url: string) => {
    let cleanUrl = url.trim().replace(/\/+$/, '');
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'http://' + cleanUrl;
    }
    await storage.set(SERVER_KEY, cleanUrl);
    set({ serverUrl: cleanUrl, isConfigured: true });
    await get().testConnection(cleanUrl);
  },

  testConnection: async (testUrl?: string) => {
    const target = (testUrl || get().serverUrl || DEFAULT_URL).replace(/\/+$/, '');
    set({ isTesting: true, errorMessage: '' });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${target}/api/me`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        set({ connectionStatus: 'connected', isTesting: false, errorMessage: '' });
        return true;
      } else {
        set({ connectionStatus: 'error', isTesting: false, errorMessage: `Server returned HTTP ${res.status}` });
        return false;
      }
    } catch (err: any) {
      const msg = err.name === 'AbortError' ? 'Connection timed out' : (err.message || 'Cannot connect to server');
      set({ connectionStatus: 'error', isTesting: false, errorMessage: msg });
      return false;
    }
  },

  clearServer: async () => {
    await storage.remove(SERVER_KEY);
    set({ serverUrl: '', isConfigured: false, connectionStatus: 'idle', errorMessage: '' });
  },
}));
