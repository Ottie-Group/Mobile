import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Styled } from './ConnectServerPage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { BrandHeader } from '../components/common/BrandHeader';
import { Button } from '../components/common/Button';
import { useServerStore } from '../store/useServerStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

export function ConnectServerPage() {
  const navigate = useNavigate();
  const { serverUrl, setServerUrl, testConnection, isTesting, connectionStatus, errorMessage } = useServerStore();
  const fetchSession = useAuthStore((s) => s.fetchSession);
  const showToast = useToastStore((s) => s.showToast);

  const [inputUrl, setInputUrl] = useState(serverUrl || '');

  const handleTest = async () => {
    const target = inputUrl.trim() || 'http://localhost:8080';
    const ok = await testConnection(target);
    if (ok) {
      showToast('Connected to Ottie Vault Server!');
    }
  };

  const handleSaveAndProceed = async () => {
    const target = inputUrl.trim() || 'http://localhost:8080';
    await setServerUrl(target);
    await fetchSession();
    navigate('/');
  };

  return (
    <MobileAppShell showNav={false} showHeader={false}>
      <BrandHeader title="Connect to Den" subtitle="Enter your self-hosted Ottie instance URL" />

      <Styled.Card>
        <Styled.FieldGroup>
          <label>Ottie Server Address</label>
          <input
            type="text"
            placeholder="http://localhost:8080"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <Styled.PresetsList>
            <Styled.PresetChip onClick={() => setInputUrl('http://localhost:8080')}>
              Local :8080
            </Styled.PresetChip>
            <Styled.PresetChip onClick={() => setInputUrl('http://192.168.8.150:9102')}>
              LAN :9102
            </Styled.PresetChip>
            <Styled.PresetChip onClick={() => setInputUrl('http://10.0.2.2:8080')}>
              Android Emulator
            </Styled.PresetChip>
          </Styled.PresetsList>
        </Styled.FieldGroup>

        {connectionStatus !== 'idle' && (
          <Styled.StatusBox status={connectionStatus}>
            <span>{connectionStatus === 'connected' ? 'Server Reachable' : `${errorMessage}`}</span>
          </Styled.StatusBox>
        )}

        <Styled.ActionsCol>
          <Button variant="outline" fullWidth onClick={handleTest} disabled={isTesting}>
            {isTesting ? 'Testing Connection...' : 'Test Connection'}
          </Button>

          <Button variant="primary" fullWidth onClick={handleSaveAndProceed}>
            Save & Connect to Den
          </Button>
        </Styled.ActionsCol>
      </Styled.Card>
    </MobileAppShell>
  );
}