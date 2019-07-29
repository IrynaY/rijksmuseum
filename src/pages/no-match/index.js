import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoMatchStyled = styled.div`
  padding: 50px;
  text-align: center;
`;

const NotFoundStyled = styled.h1`
  font-size: 98px;
`;

const NoMatchPage = () => 
  <NoMatchStyled>
    <NotFoundStyled>404</NotFoundStyled>
    <Link to="/">Home</Link>
  </NoMatchStyled>;

export default NoMatchPage;
