import styled from '@emotion/styled';

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.bgApp};
    overflow: hidden;
  `,

  TopWaveHeader: styled.header`
    background: ${({ theme }) => theme.colors.bgMain};
    padding-top: calc(var(--safe-area-top) + 12px);
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 18px;
    position: relative;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    z-index: 10;
  `,

  HeaderRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  LogoBox: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    h1 {
      font-size: 19px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
  `,

  HeaderActionButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.92);
      background: rgba(255, 255, 255, 0.25);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `,

  ModalBackdrop: styled.div`
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `,

  ModalCard: styled.div`
    background: #ffffff;
    border-radius: 24px;
    width: 100%;
    max-width: 330px;
    padding: 24px 20px 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `,

  ModalAvatar: styled.img`
    width: 68px;
    height: 68px;
    object-fit: contain;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  `,

  ModalTitle: styled.h2`
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
  `,

  ModalVersion: styled.span`
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: #0284c7;
    background: #e0f2fe;
    padding: 3px 10px;
    border-radius: 9999px;
    margin-bottom: 12px;
  `,

  ModalDescription: styled.p`
    font-size: 13px;
    line-height: 1.5;
    color: #475569;
    margin: 0 0 16px 0;
  `,

  ModalServerBox: styled.div`
    width: 100%;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    text-align: left;
    cursor: pointer;

    .server-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;

      .label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #94a3b8;
        letter-spacing: 0.5px;
      }

      .url {
        font-size: 12px;
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .status-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 8px;
    }
  `,

  ModalCloseButton: styled.button`
    width: 100%;
    padding: 12px;
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  `,

  ContentArea: styled.main<{ hasHeader?: boolean }>`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: ${({ hasHeader = true }) =>
      hasHeader ? '16px 16px 80px 16px' : 'calc(var(--safe-area-top) + 24px) 16px 80px 16px'};
    -webkit-overflow-scrolling: touch;
  `,

  BottomNav: styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(64px + var(--safe-area-bottom));
    padding-bottom: var(--safe-area-bottom);
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(16px);
    border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 50;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
  `,

  NavItem: styled.button<{ isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    flex: 1;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.textMuted)};
    transition: all 0.15s ease;

    svg {
      width: 22px;
      height: 22px;
      stroke-width: ${({ isActive }) => (isActive ? '2.5' : '1.8')};
    }

    span {
      font-size: 11px;
      font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
    }

    &:active {
      transform: scale(0.92);
    }
  `,
};
