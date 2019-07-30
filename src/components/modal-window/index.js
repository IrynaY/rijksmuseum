import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../button';

class ModalWindow extends React.Component {

  el = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { children, onClose} = this.props;

    return (
      <>
        {ReactDOM.createPortal(
          <ModalStyled>
            <div className='window'>
              <div className='header'>
                <Button onClick={onClose}>X</Button>
              </div>
              {children}
            </div>
          </ModalStyled>,
          document.body)}
      </>
    );
  }
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

ModalWindow.defaultProps = {
  children: ''
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .window {
    padding: 10px;
    position: absolute;
    top: 50%; left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    overflow: hidden;

    .header {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default ModalWindow;
