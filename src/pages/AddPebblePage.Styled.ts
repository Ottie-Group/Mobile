import styled from '@emotion/styled';

export const Styled = {
  Card: styled.div`
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 20px 18px;
    box-shadow: ${({ theme }) => theme.shadows.md};
  `,

  TabsRow: styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    background: #f1f5f9;
    padding: 4px;
    border-radius: 12px;
  `,

  TabBtn: styled.button<{ isActive: boolean }>`
    flex: 1;
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    background: ${({ isActive }) => (isActive ? '#ffffff' : 'transparent')};
    color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : '#64748b')};
    font-size: 13px;
    font-weight: 700;
    box-shadow: ${({ isActive }) => (isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none')};
    cursor: pointer;
    transition: all 0.15s ease;
  `,

  ScanArea: styled.div`
    text-align: center;
    padding: 30px 16px;
    border: 2px dashed ${({ theme }) => theme.colors.primaryBorder};
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.primaryLight};
    margin-bottom: 20px;

    svg {
      width: 48px;
      height: 48px;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 12px;
    }

    h4 {
      font-size: 15px;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.textDark};
      margin-bottom: 4px;
    }

    p {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textMuted};
      margin-bottom: 16px;
    }
  `,

  FieldGroup: styled.div`
    margin-bottom: 16px;

    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.textDark};
      margin-bottom: 6px;
    }

    input {
      width: 100%;
      padding: 12px 14px;
      border-radius: ${({ theme }) => theme.radii.lg};
      border: 1.5px solid #cbd5e1;
      font-size: 14px;
      background: #f8fafc;
      color: #0f172a;
      outline: none;
      transition: all 0.15s ease;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        background: #ffffff;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
      }
    }
  `,
};
