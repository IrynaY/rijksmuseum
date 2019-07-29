import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FavouriteStyled = styled.button`
  padding: 25px;
  border: 1px solid black;
`;

const handleOpenList = () => {

};

const Favourite = ({ list, onShowList }) => {

  const totalFavourites = list.length;

  return (
    <FavouriteStyled onClick={onShowList}>
      {totalFavourites === 0 ? 'No favourite items yet' : totalFavourites}
    </FavouriteStyled>
  );
};

export default Favourite;

