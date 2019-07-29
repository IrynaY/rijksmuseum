import React from 'react';
import styled from 'styled-components';

const ORDER_TYPES = {
  relevance: 'Relevance',
  objecttype: 'Type of work',
  chronologic: 'Chronological old > new',
  achronologic: 'Chronological new > old',
  artist: 'Artist A > Z',
  artistdesc: 'Artist Z > A',
};

const SearchBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5px;
`;

const SearchBar = ({ onSearchSubmit, onOrderApply }) => {

  const formOnSubmit = event => {
    event.preventDefault();
    onSearchSubmit(event);
  };

  return (
    <SearchBarStyled>
      <select onChange={onOrderApply}>
        {Object.keys(ORDER_TYPES).map( key =>
          <option value={key} key={key}> {ORDER_TYPES[key]} </option>
        )}
      </select>
      <form onSubmit={formOnSubmit}>
        <input type='search' name='keyword' placeholder='Search keyword...' />
        <button>Search</button>
      </form>
    </SearchBarStyled>
  );
};

export default SearchBar;

