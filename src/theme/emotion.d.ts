import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    name: string;
    colors: {
      bgMain: string;
      bgApp: string;
      primary: string;
      primaryHover: string;
      primaryLight: string;
      primaryBorder: string;
      secondary: string;
      accent: string;
      danger: string;
      dangerHover: string;
      cardBg: string;
      cardBorder: string;
      textDark: string;
      textMuted: string;
      textLight: string;
      timerTrack: string;
      timerFill: string;
      timerUrgent: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
      circle: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      glass: string;
    };
  }
}
