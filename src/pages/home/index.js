import React from 'react';
import styled from 'styled-components';

import AppContainer from '../../components/app-container';

const HomePageStyled = styled.div`
  padding: 50px;
  margin: auto;
`;

const HomePage = () =>
  <HomePageStyled>
    <AppContainer/>
  </HomePageStyled>;

export default HomePage;
