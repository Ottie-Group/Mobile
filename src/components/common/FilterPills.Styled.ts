import styled from '@emotion/styled';

export const FilterStrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 16px;
  user-select: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PillChip = styled.button<{ isActive: boolean }>`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 13px;
  font-weight: 700;
  border: 1.5px solid ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.cardBorder)};
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.cardBg)};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#475569')};
  cursor: pointer;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.15s ease;

  &:active {
    transform: scale(0.94);
  }
`;
