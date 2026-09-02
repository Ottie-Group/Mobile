import { Styled } from './PebbleCard.Styled';
import type { AccountItem, LiveCodeItem } from '../../store/useVaultStore';
import { useModalStore } from '../../store/useModalStore';
import { useToastStore } from '../../store/useToastStore';
import { copyToClipboard } from '../../services/clipboard';
import { haptic } from '../../services/haptics';

interface PebbleCardProps {
  account: AccountItem;
  liveCode?: LiveCodeItem;
}

export function PebbleCard({ account, liveCode }: PebbleCardProps) {
  const openDeleteTokenModal = useModalStore((s) => s.openDeleteTokenModal);
  const showToast = useToastStore((s) => s.showToast);

  const rawCode = liveCode?.code || '••••••';
  const formattedCode =
    rawCode.length === 6 ? `${rawCode.slice(0, 3)} ${rawCode.slice(3)}` : rawCode;

  const seconds = liveCode?.seconds_remaining ?? 30;
  const isUrgent = seconds <= 5;
  const radius = 13;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = seconds / 30;
  const strokeDashoffset = circumference - progressPercent * circumference;

  const handleCopy = async () => {
    if (!liveCode?.code) return;
    const ok = await copyToClipboard(liveCode.code);
    if (ok) {
      showToast(`Copied ${account.issuer || 'code'} to clipboard!`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.warning();
    openDeleteTokenModal(account.id, account.issuer || account.accountName || 'this');
  };

  // Get service initial letter for badge
  const initial = (account.issuer || account.accountName || 'O').charAt(0).toUpperCase();

  return (
    <Styled.Card onClick={handleCopy}>
      <Styled.LeftMeta>
        <Styled.IconBox>{initial}</Styled.IconBox>
        <Styled.InfoCol>
          <div className="issuer">{account.issuer || 'Unnamed Pebble'}</div>
          <div className="account">{account.accountName || '2FA Code'}</div>
          {account.category && <div className="category">{account.category}</div>}
        </Styled.InfoCol>
      </Styled.LeftMeta>

      <Styled.RightAction>
        <Styled.CodeBlock isUrgent={isUrgent}>
          <div className="code">{formattedCode}</div>
          <div className="hint">Tap to copy</div>
        </Styled.CodeBlock>

        <Styled.TimerCircle isUrgent={isUrgent}>
          <svg viewBox="0 0 32 32">
            <circle className="track" cx="16" cy="16" r={radius} />
            <circle
              className="progress"
              cx="16"
              cy="16"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="seconds">{seconds}</span>
        </Styled.TimerCircle>

        <Styled.TrashBtn onClick={handleDeleteClick} title="Delete Pebble">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </Styled.TrashBtn>
      </Styled.RightAction>
    </Styled.Card>
  );
}
