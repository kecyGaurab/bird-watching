import React from 'react';
import styled from 'styled-components';
import bird from '../../assets/bird.png';

const HeroImage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 75vh;
  overflow: hidden;
  background-size: cover !important;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 37%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${bird}) no-repeat center center scroll;
`;

const Hero = ({ children }) => {
  return <HeroImage>{children}</HeroImage>;
};

export default Hero;
