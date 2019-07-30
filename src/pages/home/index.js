import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SearchBar from '../../components/search-bar';
import TileList from '../../components/tile-list';
import Pagination from '../../components/pagination';
import Button from '../../components/button';

import {
  getCollections,
  getCollectionsByKeyword,
  getCollectionsByOrder,
  updatePerPageView,
  getCollectionsByPage,
  updateFavourites,
  getFavourites
} from '../../actions';

const HomePageContainer = ({
  collections, favourites, totalPages, currentPage, perPage, updatePerPageView, getFavourites, keyword,
  getCollections, getCollectionsByKeyword, getCollectionsByOrder, getCollectionsByPage, updateFavourites
}) => {
  const [favouritesMode, setFavouritesMode] = useState(false);

  useEffect( () => {
    getCollections();
  }, []);

  useEffect( () => {
    favouritesMode ? getFavourites() : getCollections();
  }, [favouritesMode]);

  const favouritesCount = favourites.length;

  const handleSearch = event => getCollectionsByKeyword(event.target.keyword.value);

  const handleOrder = event => getCollectionsByOrder(event.target.value);

  const handlePageNavigation = pageNumber => getCollectionsByPage(pageNumber);

  const handlePerPage = e => updatePerPageView(e.target.value);

  const handleFavourites = id => updateFavourites(id);

  const handleShowFavourites = () => setFavouritesMode(!favouritesMode);

  return (
    <HomePageStyled>
      <div className='content'>
        <div className='header'>
          <div className='right'>
            <FavouritesButton 
              onClick={handleShowFavourites}
              active={favouritesMode}
            >
              {favouritesCount > 0 
                ? <>Fav <span className='circle'>{favouritesCount}</span></> 
                : 'No favourite items yet'
              }
            </FavouritesButton>
          </div>

          <SearchBar
            onSearchSubmit={handleSearch}
            onOrderApply={handleOrder}
          />
        </div>

        <TileList 
          list={collections}
          onUpdateFavourites={handleFavourites}
          message={favouritesMode ? 'No favourite itmes yet' :'No art object could be found by your query'}
        />

        <div className='footer'>
          {totalPages > 0 && 
            <Pagination
              totalPages={+totalPages}
              currentPage={+currentPage}
              itemsOnPage={+perPage}
              onPageChange={handlePageNavigation}
              onPerPageChange={handlePerPage}
              className='right'
            />
          }
        </div>
      </div>
    </HomePageStyled>
  );
};


HomePageContainer.propTypes = {
  collections: PropTypes.object,
  favourites: PropTypes.array,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  keyword: PropTypes.string,
  updatePerPageView: PropTypes.func,
  getFavourites: PropTypes.func,
  getCollections: PropTypes.func,
  getCollectionsByKeyword: PropTypes.func,
  getCollectionsByOrder: PropTypes.func,
  getCollectionsByPage: PropTypes.func,
  updateFavourites: PropTypes.func,
};

HomePageContainer.defaultProps = {
  keyword: '',
  collections: {},
  favourites: []
};

const HomePageStyled = styled.div`
  padding: 20px;
  margin: auto;

  .content {
    max-width: 1000px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .header {
      display: flex;
      flex-direction: column;
    }
  
    .right {
      display: flex;
      justify-content: flex-end;
    }

    .footer {
      // flex: 0 0 auto;
    }
  }
`;

const FavouritesButton = styled(Button)`
  background-color: ${props => props.active ? '#F15F45' : '#f2f5f5'};
  .circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid grey;
    border-radius: 50%;
    line-height: 9px;
    padding: 8px;
    background-color: white;
  }
`;

export default connect(
  ({ collections, favourites, totalPages, currentPage, perPage, keyword }) => 
    ({ collections, favourites, totalPages, currentPage, perPage, keyword }),
  { 
    getCollections, 
    getCollectionsByKeyword, 
    getCollectionsByOrder, 
    updatePerPageView, 
    getCollectionsByPage, 
    updateFavourites,
    getFavourites
  }
)(HomePageContainer);
