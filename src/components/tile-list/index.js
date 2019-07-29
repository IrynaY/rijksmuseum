import React from 'react';
import styled from 'styled-components';

import Tile from '../tile';

const TileListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TileList = ({ list }) => {
  return (
    <TileListStyled>
      {list && list.map(({ objectNumber, headerImage, webImage, title, longTitle}) =>
        <Tile
          key={objectNumber}
          id={objectNumber}
          headerImage={headerImage.url}
          webImage={webImage ? webImage.url : ''}
          title={title}
          description={longTitle}
        />
      )}
      {(list.length === 0) && <div>No art object could be found by your query</div> }
    </TileListStyled>
  );
};

export default TileList;

