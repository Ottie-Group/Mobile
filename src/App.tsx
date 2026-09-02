import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from './theme/GlobalStyles';
import { Toast } from './components/common/Toast';
import { useThemeStore } from './store/useThemeStore';
import { useServerStore } from './store/useServerStore';
import { useAuthStore } from './store/useAuthStore';
import { api } from './api/client';

import { ConnectServerPage } from './pages/ConnectServerPage';
import { LoginPage } from './pages/LoginPage';
import { Login2FAPage } from './pages/Login2FAPage';
import { DashboardPage } from './pages/DashboardPage';
import { AddPebblePage } from './pages/AddPebblePage';
import { SettingsPage } from './pages/SettingsPage';

import { ProtectedGuard, PublicOnlyGuard } from './routes/guards';

export function App() {
  const { currentTheme, initTheme } = useThemeStore();
  const { initServer } = useServerStore();
  const { fetchSession } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await initTheme();
        await initServer();
        await api.initCookie();
        await fetchSession();
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, [initTheme, initServer, fetchSession]);

  if (isInitializing) {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            background: currentTheme.colors.bgApp,
          }}
        >
          <img
            src="/static/ottie.svg"
            alt="Ottie"
            style={{ width: 72, height: 72, objectFit: 'contain' }}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Toast />
      <BrowserRouter>
        <Routes>
          {/* Server Config Route */}
          <Route path="/connect" element={<ConnectServerPage />} />

          {/* Public Authentication Routes */}
          <Route
            path="/login"
            element={
              <PublicOnlyGuard>
                <LoginPage />
              </PublicOnlyGuard>
            }
          />
          <Route
            path="/login/2fa"
            element={
              <PublicOnlyGuard>
                <Login2FAPage />
              </PublicOnlyGuard>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedGuard>
                <DashboardPage />
              </ProtectedGuard>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedGuard>
                <AddPebblePage />
              </ProtectedGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedGuard>
                <SettingsPage />
              </ProtectedGuard>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
