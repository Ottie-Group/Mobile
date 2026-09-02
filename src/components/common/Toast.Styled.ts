import styled from '@emotion/styled';

export const ToastContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: calc(var(--safe-area-top) + 16px);
  left: 50%;
  transform: translateX(-50%) ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-100px)')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  background: rgba(15, 23, 42, 0.92);
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  z-index: 1000;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 90vw;
  text-align: center;
`;
