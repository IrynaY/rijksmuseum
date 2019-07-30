import styled from 'styled-components';

const Button = styled.button`
  width: ${props => props.width};
  margin: 5px 5px;
  padding: 10px 12px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: ${props => props.bgcolor || 'white'};
  text-decoration: none;
  color: black;
  font-size: 12px;
  text-align: center;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(115,217,235,1);
  }
`;

export default Button;
