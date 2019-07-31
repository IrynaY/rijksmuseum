import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PER_PAGE_VALUES = [10, 50, 100];

const Pagination = ({ totalPages, currentPage, itemsOnPage, onPageChange, onPerPageChange, className }) => {

  const goToPage = ( { target: { name } } ) => {
    if(name === 'next' && currentPage !== totalPages)
      return onPageChange(++currentPage);
    else if(name === 'back' && currentPage !== 1)
      return onPageChange(--currentPage);
  };

  return (
    <PaginationStyled className={className}>
      <div className='left'>
        {(currentPage > 1) && <button name='back' onClick={goToPage}> Back </button>}
        <span className='current'>{currentPage}</span>
        {(currentPage < totalPages) && <button name='next' onClick={goToPage}> Next </button>}
      </div>
      <div className='right'>
        {PER_PAGE_VALUES.map(( (value, index, array) =>
          <div key={value}> 
            <ButtonStyled 
              onClick={onPerPageChange} 
              value={value}
              active={value === itemsOnPage}
            >
              {value}
            </ButtonStyled>
            {index < array.length - 1  && <span> | </span>}
          </div>
        ))}
      </div>
    </PaginationStyled>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  itemsOnPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onPerPageChange: PropTypes.func,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  currentPage: 0,
  totalPages: 0
};

const PaginationStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .left,
  .right {
    padding: 10px; 
    display: flex;
    flex-basis: 30%;
  }

  .right {
    justify-content: flex-end;
  }

  .left {
    justify-content: center;    
  }

  .current {
    margin: 0 10px;
  }
`;

const ButtonStyled = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  outline: none;
`;

export default Pagination;
