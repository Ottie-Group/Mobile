import { Styled } from './BrandHeader.Styled';

interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
}

export function BrandHeader({
  title = 'Ottie',
  subtitle = 'Zero-Knowledge 2FA Vault',
  logoSrc = '/static/ottie.svg',
}: BrandHeaderProps) {
  return (
    <Styled.HeaderWrap>
      <Styled.LogoImg src={logoSrc} alt="Ottie Vault" />
      <Styled.Title>{title}</Styled.Title>
      {subtitle && <Styled.Subtitle>{subtitle}</Styled.Subtitle>}
    </Styled.HeaderWrap>
  );
}
