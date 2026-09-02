import { Styled } from './DeleteModal.Styled';
import { Button } from '../common/Button';
import { useModalStore } from '../../store/useModalStore';
import { useVaultStore } from '../../store/useVaultStore';
import { useToastStore } from '../../store/useToastStore';

export function DeleteModal() {
  const { deleteTokenModal, closeDeleteTokenModal } = useModalStore();
  const deleteToken = useVaultStore((s) => s.deleteToken);
  const showToast = useToastStore((s) => s.showToast);

  if (!deleteTokenModal.isOpen) return null;

  const handleConfirm = async () => {
    if (!deleteTokenModal.tokenId) return;
    try {
      await deleteToken(deleteTokenModal.tokenId);
      showToast(`Removed ${deleteTokenModal.issuer || 'token'} from vault.`);
      closeDeleteTokenModal();
    } catch (_err) {
      showToast('Failed to delete token.');
    }
  };

  return (
    <Styled.Backdrop isOpen={deleteTokenModal.isOpen} onClick={closeDeleteTokenModal}>
      <Styled.ModalSheet onClick={(e) => e.stopPropagation()}>
        <Styled.Title>Release This Secret Pebble?</Styled.Title>
        <Styled.Desc>
          Are you sure you want to delete <strong>{deleteTokenModal.issuer}</strong>? This cannot be undone once deleted from your den.
        </Styled.Desc>
        <Styled.ActionsRow>
          <Button variant="outline" fullWidth onClick={closeDeleteTokenModal}>
            Keep It
          </Button>
          <Button variant="danger" fullWidth onClick={handleConfirm}>
            Yes, Drop Pebble
          </Button>
        </Styled.ActionsRow>
      </Styled.ModalSheet>
    </Styled.Backdrop>
  );
}
