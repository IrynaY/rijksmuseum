import React from 'react';
import styled from 'styled-components';

const PER_PAGE_VALUES = [10, 50, 100];

const Pagination = ({ totalPages, currentPage, onPageChange, onPerPageChange }) => {

  const goToPage = ( event ) => {
    if(event.target.name === 'next' && currentPage !== totalPages)
      return onPageChange(++currentPage);
    else if(event.target.name === 'back' && currentPage !== 1)
      return onPageChange(--currentPage);
  };

  return (
      <>
        <div>
          {(currentPage > 1) && <button name='back' onClick={goToPage}> Back </button>}
          <span>{currentPage}</span>
          {(currentPage < totalPages) && <button name='next' onClick={goToPage}> Next </button>}
        </div>
        <div>
          {PER_PAGE_VALUES.map((value =>
            <button key={value} onClick={onPerPageChange} value={value}>
              {value}
            </button>
          )) }
        </div>
      </>
  );
};

export default Pagination;
