import { create } from 'zustand';

interface ModalState {
  deleteTokenModal: {
    isOpen: boolean;
    tokenId: string | null;
    issuer: string | null;
  };
  openDeleteTokenModal: (tokenId: string, issuer: string) => void;
  closeDeleteTokenModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  deleteTokenModal: {
    isOpen: false,
    tokenId: null,
    issuer: null,
  },
  openDeleteTokenModal: (tokenId, issuer) =>
    set({
      deleteTokenModal: { isOpen: true, tokenId, issuer },
    }),
  closeDeleteTokenModal: () =>
    set({
      deleteTokenModal: { isOpen: false, tokenId: null, issuer: null },
    }),
}));
