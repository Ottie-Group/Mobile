import styled from '@emotion/styled';

export const Styled = {
  Backdrop: styled.div<{ isOpen: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    align-items: flex-end;
    justify-content: center;
    z-index: 999;
  `,

  ModalSheet: styled.div`
    background: #ffffff;
    width: 100%;
    max-width: 500px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px 20px calc(var(--safe-area-bottom) + 20px) 20px;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: center;
  `,

  Title: styled.h3`
    font-size: 18px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
  `,

  Desc: styled.p`
    font-size: 13px;
    color: #64748b;
    margin-bottom: 24px;
    line-height: 1.5;
  `,

  ActionsRow: styled.div`
    display: flex;
    gap: 12px;
  `,
};
