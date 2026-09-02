import { create } from 'zustand';

interface ToastState {
  message: string | null;
  isVisible: boolean;
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  isVisible: false,

  showToast: (message: string, duration = 3000) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ message, isVisible: true });
    toastTimer = setTimeout(() => {
      set({ isVisible: false });
    }, duration);
  },

  hideToast: () => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ isVisible: false });
  },
}));
