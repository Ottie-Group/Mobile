import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Styled } from './Login2FAPage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { BrandHeader } from '../components/common/BrandHeader';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

export function Login2FAPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const method = (location.state as any)?.method || 'email';
  const verify2FA = useAuthStore((s) => s.verify2FA);
  const showToast = useToastStore((s) => s.showToast);

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      setLoading(true);
      await verify2FA(code.trim());
      showToast('Passcode verified! Welcome back.');
      navigate('/');
    } catch (err: any) {
      showToast(err.message || 'Invalid passcode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileAppShell showNav={false} showHeader={false}>
      <BrandHeader title="Two-Factor Security" subtitle={`Enter the 6-digit code sent via ${method}`} />

      <Styled.Card as="form" onSubmit={handleVerify}>
        <Styled.OtpInput
          type="text"
          maxLength={6}
          placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />

        <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
          {loading ? 'Verifying...' : 'Confirm & Enter Vault'}
        </Button>
      </Styled.Card>
    </MobileAppShell>
  );
}
