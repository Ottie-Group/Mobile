import styled from '@emotion/styled';

export const StyledButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  border: 1.5px solid transparent;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  transition: all 0.15s ease;
  user-select: none;
  touch-action: manipulation;

  padding: ${({ size }) =>
    size === 'sm' ? '8px 14px' : size === 'lg' ? '16px 24px' : '12px 20px'};
  font-size: ${({ size }) =>
    size === 'sm' ? '13px' : size === 'lg' ? '16px' : '14px'};

  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
          &:active {
            transform: scale(0.97);
            background: ${theme.colors.primaryHover};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.primaryLight};
          color: ${theme.colors.primaryHover};
          border-color: ${theme.colors.primaryBorder};
          &:active {
            transform: scale(0.97);
          }
        `;
      case 'outline':
        return `
          background: #ffffff;
          color: ${theme.colors.textDark};
          border-color: ${theme.colors.cardBorder};
          &:active {
            transform: scale(0.97);
            background: #f8fafc;
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.danger};
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
          &:active {
            transform: scale(0.97);
            background: ${theme.colors.dangerHover};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`;
