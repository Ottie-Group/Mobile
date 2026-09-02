import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Styled } from './LoginPage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { BrandHeader } from '../components/common/BrandHeader';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const showToast = useToastStore((s) => s.showToast);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showToast('Please enter both username and master key');
      return;
    }

    try {
      setLoading(true);
      const res = await login(username.trim(), password.trim());
      if (res.requires2FA) {
        navigate('/login/2fa', { state: { method: res.method } });
      } else if (res.requiresOTP) {
        navigate('/login/otp');
      } else {
        showToast('Welcome back to the den!');
        navigate('/');
      }
    } catch (err: any) {
      showToast(err.message || 'Login failed. Check your master key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileAppShell showNav={false} showHeader={false}>
      <BrandHeader title="Unlock Den" subtitle="Enter your username & master password" />

      <Styled.Card as="form" onSubmit={handleLogin}>
        <Styled.FieldGroup>
          <label>Username</label>
          <input
            type="text"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </Styled.FieldGroup>

        <Styled.FieldGroup>
          <label>Master Vault Key</label>
          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Styled.FieldGroup>

        <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
          {loading ? 'Decrypting Vault...' : 'Dive Into My Den'}
        </Button>

        <Styled.SwitchServerLink type="button" onClick={() => navigate('/connect')}>
          Change Server Endpoint
        </Styled.SwitchServerLink>
      </Styled.Card>
    </MobileAppShell>
  );
}
