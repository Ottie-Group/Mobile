import styled from '@emotion/styled';

export const Styled = {
  SearchWrap: styled.div`
    position: relative;
    margin-bottom: 14px;

    input {
      width: 100%;
      padding: 12px 16px 12px 40px;
      border-radius: ${({ theme }) => theme.radii.pill};
      border: 1.5px solid #cbd5e1;
      background: #ffffff;
      font-size: 14px;
      color: #0f172a;
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.sm};
      transition: all 0.15s ease;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
      }
    }

    .icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
      display: flex;
      align-items: center;
    }
  `,

  CardsList: styled.div`
    display: flex;
    flex-direction: column;
  `,

  EmptyState: styled.div`
    text-align: center;
    padding: 48px 20px;
    background: #ffffff;
    border-radius: 20px;
    border: 1.5px dashed #cbd5e1;
    margin-top: 10px;

    img {
      width: 64px;
      height: 64px;
      margin-bottom: 12px;
      opacity: 0.9;
    }

    h3 {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }

    p {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 20px;
      max-width: 260px;
      margin-left: auto;
      margin-right: auto;
    }
  `,

  FabButton: styled.button`
    position: fixed;
    bottom: calc(var(--safe-area-bottom) + 80px);
    right: 20px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 18px rgba(5, 150, 105, 0.4);
    cursor: pointer;
    z-index: 40;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    svg {
      width: 26px;
      height: 26px;
      stroke-width: 2.5;
    }
  `,
};
