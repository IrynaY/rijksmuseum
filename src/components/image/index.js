import styled from 'styled-components';

const Image = styled.img`
  width: ${props => props.size.width};
  heigth: ${props => props.size.heigth};
`;

export default Image;
