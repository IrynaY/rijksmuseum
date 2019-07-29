import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SearchBar from '../search-bar';
import TileList from '../tile-list';
import Favourite from '../favourite';
import Pagination from '../pagination';

import {
  getCollections, getCollectionsByKeyword, getCollectionsByOrder, updatePerPageView, getCollectionsByPage
} from '../../actions';

const AppStyled = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
`;

const RightPosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;


const AppContainer = ({
  collections, favourites, totalPages, currentPage,
  getCollections, getCollectionsByKeyword, getCollectionsByOrder, updatePerPageView, getCollectionsByPage
}) => {
  useEffect( () => {
    getCollections();
  }, []);

  const handleSearch = event => getCollectionsByKeyword(event.target.keyword.value);
  const handleOrder = event => getCollectionsByOrder(event.target.value);

  const handlePageNavigation = pageNumber => {
    updatePerPageView(pageNumber);
  };

  const handlePerPage = e => {
    getCollectionsByPage(e.target.value);
  };

  const handleFavourites = () => {};

  return (
    <AppStyled>
      <HeaderStyled>
        <RightPosition>
          <Favourite list={favourites} onShowList={handleFavourites}/>
        </RightPosition>

        <SearchBar
          onSearchSubmit={handleSearch}
          onOrderApply={handleOrder}
        />
      </HeaderStyled>

      <TileList list={collections}/>

      <Pagination
        totalPages={+totalPages}
        currentPage={+currentPage}
        onPageChange={handlePageNavigation}
        onPerPageChange={handlePerPage}
      />
    </AppStyled>
  );
};


export default connect(
  ({ collections, favourites, totalPages, currentPage }) => ({ collections, favourites, totalPages, currentPage }),
  { getCollections, getCollectionsByKeyword, getCollectionsByOrder, updatePerPageView, getCollectionsByPage }
)(AppContainer);

