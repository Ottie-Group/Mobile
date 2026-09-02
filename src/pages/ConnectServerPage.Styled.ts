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
    margin-bottom: 20px;

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

  PresetsList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  `,

  PresetChip: styled.button`
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s ease;

    &:active {
      transform: scale(0.95);
      background: ${({ theme }) => theme.colors.primaryLight};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  StatusBox: styled.div<{ status: 'idle' | 'connected' | 'error' }>`
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;

    ${({ status, theme }) => {
      switch (status) {
        case 'connected':
          return `
            background: ${theme.colors.primaryLight};
            color: ${theme.colors.primaryHover};
            border: 1px solid ${theme.colors.primaryBorder};
          `;
        case 'error':
          return `
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          `;
        default:
          return `
            background: #f1f5f9;
            color: #64748b;
            border: 1px solid #e2e8f0;
          `;
      }
    }}
  `,

  ActionsCol: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
  `,
};
