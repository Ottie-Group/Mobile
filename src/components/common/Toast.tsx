import { ToastContainer } from './Toast.Styled';
import { useToastStore } from '../../store/useToastStore';

export function Toast() {
  const { message, isVisible, hideToast } = useToastStore();

  return (
    <ToastContainer isVisible={isVisible} onClick={hideToast}>
      <span>{message}</span>
    </ToastContainer>
  );
}
