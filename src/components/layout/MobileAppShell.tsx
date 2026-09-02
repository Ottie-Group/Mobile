import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Styled } from './MobileAppShell.Styled';

import { haptic } from '../../services/haptics';

interface MobileAppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  showHeader?: boolean;
}

export function MobileAppShell({ children, showNav = true, showHeader = true }: MobileAppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showAbout, setShowAbout] = useState(false);

  const handleNav = (path: string) => {
    haptic.selection();
    navigate(path);
  };

  

  return (
    <Styled.Container>
      {showHeader && (
        <Styled.TopWaveHeader>
          <Styled.HeaderRow>
            <Styled.LogoBox onClick={() => handleNav('/')}>
              <img src="/static/ottie.svg" alt="Ottie" />
              <h1>Ottie</h1>
            </Styled.LogoBox>

            <Styled.HeaderActionButton
              onClick={() => {
                haptic.light();
                setShowAbout(true);
              }}
              aria-label="About Ottie"
              title="About Ottie"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </Styled.HeaderActionButton>
          </Styled.HeaderRow>
        </Styled.TopWaveHeader>
      )}

      <Styled.ContentArea hasHeader={showHeader}>{children}</Styled.ContentArea>

      {showNav && (
        <Styled.BottomNav>
          <Styled.NavItem
            isActive={location.pathname === '/'}
            onClick={() => handleNav('/')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Den</span>
          </Styled.NavItem>

          <Styled.NavItem
            isActive={location.pathname === '/add'}
            onClick={() => handleNav('/add')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>Add</span>
          </Styled.NavItem>

          <Styled.NavItem
            isActive={location.pathname === '/settings'}
            onClick={() => handleNav('/settings')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Settings</span>
          </Styled.NavItem>
        </Styled.BottomNav>
      )}

      {showAbout && (
        <Styled.ModalBackdrop onClick={() => setShowAbout(false)}>
          <Styled.ModalCard onClick={(e) => e.stopPropagation()}>
            <Styled.ModalAvatar src="/static/ottie.svg" alt="Ottie" />
            <Styled.ModalTitle>Ottie 2FA</Styled.ModalTitle>
            <Styled.ModalVersion>v1.0.0 Mobile Companion</Styled.ModalVersion>
            <Styled.ModalDescription>
              A private, self-hosted two-factor authentication companion. Keep your digital pebbles safely secured in your personal den.
            </Styled.ModalDescription>



            <Styled.ModalCloseButton onClick={() => setShowAbout(false)}>
              Close
            </Styled.ModalCloseButton>
          </Styled.ModalCard>
        </Styled.ModalBackdrop>
      )}
    </Styled.Container>
  );
}