import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/button';

import { fetchObject } from '../../utils';
import { getCollectionsByKeyword } from '../../actions';

const ObjectPageContainer = ({ match: { params : { id } }, getCollectionsByKeyword }) => {
  
  const [details, setDetails] = useState();

  useEffect( () => {
    const fetchData = async () => {
      let { 
        artObject: { description, objectTypes, title,  webImage: { url } },
        artObjectPage: { tags }
      } = await fetchObject(id);
      url.replace('s0', 's300');
      setDetails({ objectTypes, title, url, description, tags });
    };
    fetchData();
  }, [id]);

  const handleSearch = ({target: { name }}) => getCollectionsByKeyword(name);

  return (
    <>
       {details && 
        <ObjectPageStyled>
          <h3>{details.title}</h3>
          <div>
            <img src={details.url} alt={details.title}/>
            <p>{details.description}</p>
            <p>Types:</p>
            {details.objectTypes.map(item => 
              <Button 
                as={Link} 
                key={item} 
                onClick={handleSearch}
                name={item}
                to='/'
              >
                {item}
              </Button>
            )}
            <p>Tags: {details.tags}</p>
            {details.tags.map(item => 
              <Button 
                as={Link} 
                key={item} 
                onClick={handleSearch}
                name={item}
                to='/'
              >
                {item}
              </Button>
            )}
          </div> 
        </ObjectPageStyled>
       }
    </>
  );
};

ObjectPageContainer.propTypes = {
  match: PropTypes.any,
  getCollectionsByKeyword: PropTypes.func
};

const ObjectPageStyled = styled.div`
  text-align: center;
  padding: 50px;
  
  img {
    margin: 0 10px 5px 5px; 
    max-width: 25%;
    float:left;
    height: auto;
  }
`;

export default connect(
  () => ({}), { getCollectionsByKeyword }
)(ObjectPageContainer);

