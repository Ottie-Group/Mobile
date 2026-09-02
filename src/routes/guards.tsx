import React from 'react';
import { Navigate } from 'react-router-dom';
import { useServerStore } from '../store/useServerStore';
import { useAuthStore } from '../store/useAuthStore';

export function ServerRequiredGuard({ children }: { children: React.ReactNode }) {
  const { isConfigured, serverUrl } = useServerStore();

  if (!isConfigured || !serverUrl) {
    return <Navigate to="/connect" replace />;
  }

  return <>{children}</>;
}

export function ProtectedGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { isConfigured } = useServerStore();

  if (isLoading) {
    return null;
  }

  if (!isConfigured) {
    return <Navigate to="/connect" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { isConfigured } = useServerStore();

  if (isLoading) {
    return null;
  }

  if (!isConfigured) {
    return <Navigate to="/connect" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}