import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ModalWindow from '../modal-window';
import Button from '../button';

const Tile = ({ id, headerImage, webImage, title, description, onUpdateFavourites, favourite }) => {

  const [isHover, setHover] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isFavourite, setFavourite] = useState(false);

  const handleMouseHover = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const handleOpenModal = () => setOpen(true);
  const handleCLoseModal = () => setOpen(false);

  const handleUpdateFavourite = () => {
    setFavourite(!isFavourite);
    onUpdateFavourites(id);
  };

  useEffect( () => {
    if(favourite) setFavourite(true);
  }, []);

  return (
    <>
      <TileStyled
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
        path={headerImage}
        className='tile'
      >
        {isHover &&
          <div className='short-description'>
            <p>{description}</p>
          </div>
        }
      </TileStyled>

      {isOpen &&
        <ModalWindow onClose={handleCLoseModal} isOpen={isOpen}>
          <DetailsStyled className='tile-modal'>
            <span className='title'>{title}</span>
            <p>
              <img src={webImage} alt={title}/>
              {description}
            </p>

            <div className='btn-group'>
              <div className='left'>
                <FavouriteButton width='130px' onClick={handleUpdateFavourite} active={isFavourite}>
                  {isFavourite ? 'Favourite' : 'Mark as favourite'}
                </FavouriteButton>
                <LinkStyled as={Link} to={`object/${id}`} width='130px'>View more details</LinkStyled>
              </div>
              <div className='right'>
                <Button onClick={handleCLoseModal} width='130px'>Close</Button>
              </div>
            </div>
          </DetailsStyled>
        </ModalWindow>
      }
    </>
  );
};

Tile.propTypes = {
  id: PropTypes.string,
  headerImage: PropTypes.string,
  webImage: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onUpdateFavourites: PropTypes.func,
  favourite: PropTypes.bool
};

Tile.defaultProps = {
  favourite: false,
};

const TileStyled = styled.div`
  min-width: 180px;
  height: 180px;
  margin: 10px;
  text-align: center;
  position: relative;
  background: url(${props => props.path}) no-repeat center;
  background-size: auto 100%;
  background-color: #e2e2e2;

  .short-description {
    height: 50%; width: 100%;
    top: 50%;
    position: absolute;
    background-color: #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;

    p {
      display: block;
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow: hidden;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

const LinkStyled = styled(Button)`
  padding: 10px 0;
  display: block;
  width: ${props => props.width};
`;

const FavouriteButton = styled(Button)`
  background-color: ${props => props.active ? 'yellow' : '#f15f45'};
`;

const DetailsStyled = styled.div`
  width: 100%;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;

  img {
    margin: 0 10px 5px 5px;
    max-width: 250px;
    float:left;
  }

  .title {
    font-weight: bold;
    text-align: center;
  }

  .btn-group {
    display: flex;

    .left {
      flex-basis: 50%;
    }

    .right {
      flex-basis: 50%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }
`;

export default Tile;
