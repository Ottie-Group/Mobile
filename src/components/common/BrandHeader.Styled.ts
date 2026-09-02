import styled from '@emotion/styled';

export const Styled = {
  HeaderWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    user-select: none;
  `,

  LogoImg: styled.img`
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 8px;
    filter: drop-shadow(0 4px 10px rgba(5, 150, 105, 0.25));
  `,

  Title: styled.h2`
    font-size: 22px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textDark};
    letter-spacing: -0.5px;
    margin-bottom: 4px;
  `,

  Subtitle: styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 280px;
  `,
};
