import { Capacitor } from '@capacitor/core';
import { useServerStore } from '../store/useServerStore';
import { storage } from '../services/storage';

const COOKIE_KEY = 'ottie_session_cookie';
let cachedCookie: string | null = null;
let csrfToken = '';

export const api = {
  setCsrfToken: (token: string) => {
    csrfToken = token;
  },
  getCsrfToken: () => csrfToken,

  initCookie: async () => {
    cachedCookie = await storage.get(COOKIE_KEY);
  },

  clearCookie: async () => {
    cachedCookie = null;
    await storage.remove(COOKIE_KEY);
  },

  getBaseUrl: (): string => {
    const customUrl = useServerStore.getState().serverUrl;
    return customUrl ? customUrl.replace(/\/+$/, '') : '';
  },

  request: async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const baseUrl = api.getBaseUrl();
    const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

    if (cachedCookie === null) {
      cachedCookie = await storage.get(COOKIE_KEY);
    }

    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform();

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Ottie-Client': isNative ? 'companion' : 'web-companion',
      'X-Ottie-Platform': platform,
      'X-Ottie-Version': typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.1',
      ...(options.headers as Record<string, string> || {}),
    };

    if (cachedCookie && !headers['Cookie']) {
      headers['Cookie'] = cachedCookie;
    }

    if (csrfToken && !headers['X-CSRF-Token']) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(fullUrl, {
      ...options,
      headers,
      credentials: 'include',
    });

    const setCookie = res.headers.get('Set-Cookie');
    if (setCookie) {
      const match = setCookie.match(/ottie_session=[^;]+/);
      if (match) {
        cachedCookie = match[0];
        await storage.set(COOKIE_KEY, match[0]);
      }
    }

    const tokenHeader = res.headers.get('X-CSRF-Token');
    if (tokenHeader) {
      csrfToken = tokenHeader;
    }

    const contentType = res.headers.get('Content-Type') || '';
    let data: any;

    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errorMsg = data?.error || data?.message || `HTTP ${res.status}: ${res.statusText}`;
      throw new Error(errorMsg);
    }

    return data as T;
  },

  get: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    api.request<T>(endpoint, { method: 'GET', headers }),

  post: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    api.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  delete: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    api.request<T>(endpoint, {
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),
};