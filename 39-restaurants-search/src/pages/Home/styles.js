import styled from 'styled-components';
import Slider from 'react-slick';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.aside`
  width: 360px;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Search = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 16px;

  background-color: #fff;
`;

export const Logo = styled.img`
  align-self: center;
  max-width: 160px;

  margin-bottom: 16px;
`;

export const Map = styled.div`
  width: calc(100vw - 360px);
  height: 100vh;
  background-color: red;
`;

export const Carousel = styled(Slider)`
  .slick-slide {
    margin: 0 16px;
  }
`;

export const CarouselTitle = styled.div`
  margin: 16px 0;

  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const ModalTitle = styled.h2`
  margin-bottom: 10px;
  letter-spacing: 0.11px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  text-transform: none;
  line-height: 29px;
  font-size: 24px;
  font-weight: bold;
`;

export const ModalContent = styled.span`
  margin-bottom: 10px;
  letter-spacing: 0.11px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  text-transform: none;

  font-weight: normal;
  line-height: 19px;
  font-size: 16px;
`;
