import styled from '@emotion/styled';

export const Styled = {
  Card: styled.div`
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 24px 20px;
    box-shadow: ${({ theme }) => theme.shadows.md};
  `,

  FieldGroup: styled.div`
    margin-bottom: 18px;

    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.textDark};
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 14px 16px;
      border-radius: ${({ theme }) => theme.radii.lg};
      border: 1.5px solid #cbd5e1;
      font-size: 15px;
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

  SwitchServerLink: styled.button`
    display: block;
    width: 100%;
    margin-top: 16px;
    text-align: center;
    background: transparent;
    border: none;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: pointer;

    &:active {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
};
