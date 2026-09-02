import { useNavigate } from 'react-router-dom';
import { Styled } from './SettingsPage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { BrandHeader } from '../components/common/BrandHeader';
import { Button } from '../components/common/Button';
import { useThemeStore } from '../store/useThemeStore';
import { useServerStore } from '../store/useServerStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { haptic } from '../services/haptics';

export function SettingsPage() {
  const navigate = useNavigate();
  const { themeName, setTheme } = useThemeStore();
  const { serverUrl, connectionStatus } = useServerStore();
  const { user, logout } = useAuthStore();
  const showToast = useToastStore((s) => s.showToast);

  const handleLogout = async () => {
    haptic.medium();
    await logout();
    showToast('Logged out of your vault.');
    navigate('/login');
  };

  return (
    <MobileAppShell>
      <BrandHeader title="Den Settings" subtitle="Preferences, Server, and Security" />

      <Styled.Section>
        <Styled.SectionTitle>Color Atmosphere</Styled.SectionTitle>
        <Styled.ThemeSelector>
          <Styled.ThemeBtn
            isActive={themeName === 'emerald'}
            themeColor="#059669"
            onClick={() => {
              haptic.selection();
              setTheme('emerald');
            }}
          >
            <span className="circle" />
            <span>Emerald Otter</span>
          </Styled.ThemeBtn>

          <Styled.ThemeBtn
            isActive={themeName === 'river-blue'}
            themeColor="#0284c7"
            onClick={() => {
              haptic.selection();
              setTheme('river-blue');
            }}
          >
            <span className="circle" />
            <span>River Stream</span>
          </Styled.ThemeBtn>
        </Styled.ThemeSelector>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Connected Vault Server</Styled.SectionTitle>
        <Styled.RowItem>
          <span className="label">Endpoint</span>
          <span className="value">{serverUrl || 'Not Configured'}</span>
        </Styled.RowItem>
        <Styled.RowItem>
          <span className="label">Link State</span>
          <span className="value">
            {connectionStatus === 'connected' ? 'Online' : 'Disconnected'}
          </span>
        </Styled.RowItem>
        <div style={{ marginTop: '12px' }}>
          <Button variant="outline" fullWidth size="sm" onClick={() => navigate('/connect')}>
            Switch Server Endpoint
          </Button>
        </div>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Authenticated Otter</Styled.SectionTitle>
        <Styled.RowItem>
          <span className="label">Username</span>
          <span className="value">{user?.username || 'Guest'}</span>
        </Styled.RowItem>
        <Styled.RowItem>
          <span className="label">Role</span>
          <span className="value">{user?.role || 'user'}</span>
        </Styled.RowItem>
        <div style={{ marginTop: '16px' }}>
          <Button variant="danger" fullWidth onClick={handleLogout}>
            Leave Den (Log Out)
          </Button>
        </div>
      </Styled.Section>
    </MobileAppShell>
  );
}
