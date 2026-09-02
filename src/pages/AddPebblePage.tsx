import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';
import { Styled } from './AddPebblePage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { BrandHeader } from '../components/common/BrandHeader';
import { Button } from '../components/common/Button';
import { useVaultStore } from '../store/useVaultStore';
import { useToastStore } from '../store/useToastStore';
import { haptic } from '../services/haptics';

export function AddPebblePage() {
  const navigate = useNavigate();
  const addToken = useVaultStore((s) => s.addToken);
  const showToast = useToastStore((s) => s.showToast);

  const [activeTab, setActiveTab] = useState<'scan' | 'manual'>('scan');
  const [issuer, setIssuer] = useState('');
  const [accountName, setAccountName] = useState('');
  const [secret, setSecret] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const parseOtpAuthUri = (uri: string) => {
    try {
      const url = new URL(uri);
      if (url.protocol !== 'otpauth:') return false;

      const secretParam = url.searchParams.get('secret');
      if (!secretParam) return false;

      let issuerParam = url.searchParams.get('issuer') || '';
      let label = decodeURIComponent(url.pathname.replace(/^\/\/?totp\//i, ''));

      if (label.includes(':')) {
        const parts = label.split(':');
        if (!issuerParam) issuerParam = parts[0].trim();
        label = parts[1].trim();
      }

      setSecret(secretParam);
      if (issuerParam) setIssuer(issuerParam);
      if (label) setAccountName(label);

      setActiveTab('manual');
      haptic.success();
      showToast('QR Code scanned successfully!');
      return true;
    } catch (_e) {
      return false;
    }
  };

  const handleScanQr = async () => {
    try {
      haptic.light();
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (!photo.dataUrl) return;

      const img = new Image();
      img.src = photo.dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);

        if (code && code.data) {
          if (!parseOtpAuthUri(code.data)) {
            setSecret(code.data.trim());
            setActiveTab('manual');
            showToast('Read secret key from QR.');
          }
        } else {
          showToast('No TOTP QR code detected in photo. Try closer or enter manually.');
        }
      };
    } catch (_err) {
      // User cancelled camera
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) {
      showToast('Please provide a 2FA secret key');
      return;
    }

    try {
      setLoading(true);
      await addToken({
        issuer: issuer.trim() || 'Service',
        accountName: accountName.trim() || 'Account',
        secret: secret.trim().replace(/\s+/g, ''),
        category: category.trim(),
      });
      haptic.success();
      showToast(`Added ${issuer || 'pebble'} to your den!`);
      navigate('/');
    } catch (err: any) {
      showToast(err.message || 'Failed to save token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileAppShell>
      <BrandHeader title="Add New Pebble" subtitle="Stash a 2FA secret key in your vault" />

      <Styled.Card>
        <Styled.TabsRow>
          <Styled.TabBtn
            isActive={activeTab === 'scan'}
            onClick={() => {
              haptic.selection();
              setActiveTab('scan');
            }}
          >
            Scan QR Code
          </Styled.TabBtn>
          <Styled.TabBtn
            isActive={activeTab === 'manual'}
            onClick={() => {
              haptic.selection();
              setActiveTab('manual');
            }}
          >
            Manual Entry
          </Styled.TabBtn>
        </Styled.TabsRow>

        {activeTab === 'scan' ? (
          <Styled.ScanArea>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <h4>Point Camera at QR Code</h4>
            <p>Scan 2FA setup QR codes from websites directly into your vault</p>
            <Button variant="primary" onClick={handleScanQr} fullWidth>
              Open Camera Scanner
            </Button>
          </Styled.ScanArea>
        ) : (
          <form onSubmit={handleSubmit}>
            <Styled.FieldGroup>
              <label>Service / Issuer *</label>
              <input
                type="text"
                placeholder="e.g. GitHub, Google, AWS, Discord"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                required
              />
            </Styled.FieldGroup>

            <Styled.FieldGroup>
              <label>Account Name / Email</label>
              <input
                type="text"
                placeholder="e.g. user@domain.com"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </Styled.FieldGroup>

            <Styled.FieldGroup>
              <label>Base32 Secret Key *</label>
              <input
                type="text"
                placeholder="e.g. JBSWY3DPEHPK3PXP"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
                autoCapitalize="characters"
                autoCorrect="off"
              />
            </Styled.FieldGroup>

            <Styled.FieldGroup>
              <label>Category (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Work, Finance, Social"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Styled.FieldGroup>

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
              {loading ? 'Securing Pebble...' : 'Stash in Vault'}
            </Button>
          </form>
        )}
      </Styled.Card>
    </MobileAppShell>
  );
}
