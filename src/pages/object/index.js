import React, { useState, useEffect } from 'react';

import Image from '../../components/image';

import { fetchObject } from '../../utils';

const ObjectPage = ({ match: { params : { id } } }) => {
  const [details, setDetails] = useState(0);

  useEffect( () => {
    const fetchData = async () => {
      const { artObject: { title,  webImage: { url } } } = await fetchObject(id);
      setDetails({ title, url });
    };

    fetchData();
  }, [id]);

  return (

    <div>
      <h3>ID: {id}</h3>
      <h3>ID: {details.title}</h3>
      <Image src={details.url} alt={details.title} size={{width: '300px', height: 'auto'}}/>
    </div>
  );
};

export default ObjectPage;
