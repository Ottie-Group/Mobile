import { Clipboard } from '@capacitor/clipboard';
import { haptic } from './haptics';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await Clipboard.write({ string: text });
    await haptic.success();
    return true;
  } catch (_e) {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      await haptic.success();
      return true;
    }
    return false;
  }
}
