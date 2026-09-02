import { Global, css } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        :root {
          --safe-area-top: env(safe-area-inset-top, 0px);
          --safe-area-bottom: env(safe-area-inset-bottom, 0px);
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: #f8fafc;
          color: #0f172a;
          user-select: none;
          -webkit-font-smoothing: antialiased;
        }

        #root {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        button, input, select, textarea {
          font-family: inherit;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}
    />
  );
}
