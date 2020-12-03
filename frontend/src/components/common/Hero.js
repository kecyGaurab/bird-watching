import React from 'react';
import styled from 'styled-components';
import bird from '../../assets/bird.png';

const HeroImage = styled.section`
  :hover {
    transform: scale(1.1);
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 75vh;
  background-size: cover !important;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 37%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${bird}) no-repeat center center scroll;
`;
const Wrapper = styled.div`
  overflow: hidden;
`;

const Hero = ({ children }) => {
  return (
    <Wrapper>
      <HeroImage>{children}</HeroImage>
    </Wrapper>
  );
};

export default Hero;
