import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../button';

const ORDER_TYPES = {
  relevance: 'Relevance',
  objecttype: 'Type of work',
  chronologic: 'Chronological old > new',
  achronologic: 'Chronological new > old',
  artist: 'Artist A > Z',
  artistdesc: 'Artist Z > A',
};

const SearchBar = ({ onSearchSubmit, onOrderApply, search }) => {

  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    setSearchState(search);
  }, []);

  const formOnSubmit = event => {
    event.preventDefault();
    onSearchSubmit(event);
  };

  const handleChangeSearh = ({ target: { value } }) => setSearchState(value);

  return (
    <SearchBarStyled className='search-bar'>
      <Button as='select' onChange={onOrderApply}>
        {Object.keys(ORDER_TYPES).map( key =>
          <option value={key} key={key}> 
            {ORDER_TYPES[key]} 
          </option>
        )}
      </Button>
      <form onSubmit={formOnSubmit}>
        <Button 
          as='input' 
          type='search' 
          name='keyword' 
          placeholder='Search keyword...'
          value={searchState}
          onChange={handleChangeSearh}
        />
        <Button bgcolor='#F15F45'>Search</Button>
      </form>
    </SearchBarStyled>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func,
  onOrderApply: PropTypes.func,
  search: PropTypes.string
};

const SearchBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5px;
`;

export default SearchBar;
