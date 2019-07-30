import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoMatchPage = () => 
  <NoMatchStyled>
    <h1>404</h1>
    <Link to="/">Home</Link>
  </NoMatchStyled>;

const NoMatchStyled = styled.div`
  padding: 50px;
  text-align: center;

  h1 {
    font-size: 98px;
  }
`;

export default NoMatchPage;
