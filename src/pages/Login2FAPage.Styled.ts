import styled from '@emotion/styled';

export const Styled = {
  Card: styled.div`
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 24px 20px;
    box-shadow: ${({ theme }) => theme.shadows.md};
    text-align: center;
  `,

  OtpInput: styled.input`
    width: 100%;
    max-width: 240px;
    margin: 16px auto 20px auto;
    padding: 14px 16px;
    text-align: center;
    letter-spacing: 8px;
    font-size: 24px;
    font-weight: 800;
    font-family: monospace;
    border-radius: 12px;
    border: 2px solid #cbd5e1;
    background: #f8fafc;
    color: #0f172a;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background: #ffffff;
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primaryLight};
    }
  `,
};
