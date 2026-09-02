import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const haptic = {
  light: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (_e) {}
  },
  medium: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (_e) {}
  },
  heavy: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (_e) {}
  },
  success: async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch (_e) {}
  },
  warning: async () => {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (_e) {}
  },
  error: async () => {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch (_e) {}
  },
  selection: async () => {
    try {
      await Haptics.selectionStart();
    } catch (_e) {}
  },
};
