import styled from '@emotion/styled';

export const Styled = {
  Section: styled.div`
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 18px;
    margin-bottom: 14px;
    box-shadow: ${({ theme }) => theme.shadows.sm};
  `,

  SectionTitle: styled.h3`
    font-size: 14px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textDark};
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  RowItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;

    .label {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textDark};
    }

    .value {
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 13px;
    }
  `,

  ThemeSelector: styled.div`
    display: flex;
    gap: 10px;
  `,

  ThemeBtn: styled.button<{ isActive: boolean; themeColor: string }>`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 2px solid ${({ isActive, themeColor }) => (isActive ? themeColor : '#e2e8f0')};
    background: ${({ isActive }) => (isActive ? '#f8fafc' : '#ffffff')};
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    transition: all 0.15s ease;

    .circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${({ themeColor }) => themeColor};
    }
  `,
};
