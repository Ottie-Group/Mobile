import { describe, test, expect, beforeEach } from 'bun:test';
import { useServerStore } from './useServerStore';

describe('useServerStore', () => {
  beforeEach(() => {
    useServerStore.setState({
      serverUrl: '',
      isConfigured: false,
      connectionStatus: 'idle',
      errorMessage: '',
    });
  });

  test('should set and clean server URL with protocol prefix', async () => {
    await useServerStore.getState().setServerUrl('192.168.8.150:9102/');
    expect(useServerStore.getState().serverUrl).toBe('http://192.168.8.150:9102');
    expect(useServerStore.getState().isConfigured).toBe(true);
  });

  test('should preserve https prefix when provided', async () => {
    await useServerStore.getState().setServerUrl('https://vault.domain.com///');
    expect(useServerStore.getState().serverUrl).toBe('https://vault.domain.com');
  });
});