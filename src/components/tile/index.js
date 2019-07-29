import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ModalWindow from '../modal-window';
import Image from '../image';
import Button from '../button';

const TileStyled = styled.div`
  min-width: 180px;
  height: 180px;
  margin: 10px;
  text-align: center;
  position: relative;
  background: url(${props => props.src}) no-repeat center;
  background-size: cover;
`;

const HoverStyled = styled.div`
  height: 50%;
  top: 50%;
  position: absolute;
  background-color: #F7F4F4;
  display: flex;
  align-items: center;
`;

const TextStyled = styled.div`
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 14px;
  line-height: 16px;
`;

const FavouriteStyled = styled(Button)`
  color: ${props => props.active ? 'orange' : 'white'};
`;

const Tile = ({ id, headerImage, webImage, title, description }) => {

  const [isHover, setHover] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isFavourite, setFavourite] = useState(false);

  const handleMouseHover = () => setHover(!isHover);
  const handleOpenModal = () => setOpen(true);
  const handleCLoseModal = () => setOpen(false);
  const handleFavourite = () => setFavourite(!isFavourite);

  return (
    <>
      <TileStyled
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        onClick={handleOpenModal}
        src={headerImage}
      >

        {isHover &&
          <HoverStyled>
            <TextStyled>{description}</TextStyled>
          </HoverStyled>
        }
      </TileStyled>

      {isOpen &&
        <ModalWindow onClose={handleCLoseModal} isOpen={isOpen}>
          <p>Title: {title}</p>

          {webImage && <Image src={webImage} alt={title} size={{width: 'auto', height: '300px'}}/>}
          {!webImage &&  <p>NoImg</p>}

          <p>Description: {description}</p>

          <FavouriteStyled onClick={handleFavourite} active={isFavourite}>
            Add to fav list
          </FavouriteStyled>

          <Link to={`object/${id}`}>View more details</Link>
        </ModalWindow>
      }
    </>
  );
};

export default Tile;
