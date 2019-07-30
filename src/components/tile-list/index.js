import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tile from '../tile';

const TileList = ({ list, onUpdateFavourites, message }) => {
  return (
    <TileListStyled>
      {Object.keys(list).map( id => 
        <Tile
          key={id}
          id={id}
          headerImage={list[id].headerImage}
          webImage={list[id].webImage}
          title={list[id].title}
          description={list[id].longTitle}
          onUpdateFavourites={onUpdateFavourites}
          favourite={list[id].favourite}
        />
      )}
      {(Object.keys(list).length === 0) && <div>{message}</div> }
    </TileListStyled>
  );
};

TileList.propTypes = {
  list: PropTypes.object,
  onUpdateFavourites: PropTypes.func,
  message: PropTypes.string
};

TileList.defaultProps = {
  list: {},
};

const TileListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default TileList;
