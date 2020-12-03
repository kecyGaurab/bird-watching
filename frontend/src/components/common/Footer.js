import React from 'react';
import { Typography, Link } from '@material-ui/core';
import styled from 'styled-components';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const StyledFooter = styled.footer`
  background-color: #212121;
  color: #ffff;
  padding: 15px;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="h6" align="baseline">
        @ 2020 Gaurab Kecy
        <Link href="https://github.com/kecyGaurab">
          <GitHubIcon fontSize="defualt" />
        </Link>
        <Link href="https://www.linkedin.com/in/gaurab-kc04/">
          <LinkedInIcon fontSize="default" />
        </Link>
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
