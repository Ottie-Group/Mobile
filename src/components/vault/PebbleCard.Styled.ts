import styled from '@emotion/styled';

export const Styled = {
  Card: styled.div`
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 14px 16px;
    margin-bottom: 12px;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    user-select: none;
    touch-action: manipulation;

    &:active {
      transform: scale(0.985);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,

  LeftMeta: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  `,

  IconBox: styled.div<{ bg?: string }>`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${({ bg, theme }) => bg || theme.colors.primaryLight};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  `,

  InfoCol: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;

    .issuer {
      font-size: 15px;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.textDark};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .account {
      font-size: 12px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textMuted};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 1px;
    }

    .category {
      display: inline-block;
      align-self: flex-start;
      margin-top: 4px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #f1f5f9;
      color: #64748b;
    }
  `,

  RightAction: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 8px;
  `,

  CodeBlock: styled.div<{ isUrgent: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    cursor: pointer;

    .code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: ${({ isUrgent, theme }) => (isUrgent ? theme.colors.timerUrgent : theme.colors.primary)};
      transition: color 0.2s ease;
    }

    .hint {
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      margin-top: 1px;
    }
  `,

  TimerCircle: styled.div<{ isUrgent: boolean }>`
    width: 32px;
    height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }

    circle {
      fill: none;
      stroke-width: 3.5;
    }

    .track {
      stroke: #e2e8f0;
    }

    .progress {
      stroke: ${({ isUrgent, theme }) => (isUrgent ? theme.colors.timerUrgent : theme.colors.primary)};
      stroke-linecap: round;
      transition: stroke-dashoffset 0.85s linear, stroke 0.2s ease;
    }

    .seconds {
      position: absolute;
      font-size: 10px;
      font-weight: 800;
      color: ${({ isUrgent, theme }) => (isUrgent ? theme.colors.timerUrgent : '#475569')};
    }
  `,

  TrashBtn: styled.button`
    background: transparent;
    border: none;
    color: #cbd5e1;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease;

    &:active {
      color: #ef4444;
      background: #fef2f2;
    }
  `,
};
