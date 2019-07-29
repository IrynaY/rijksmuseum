import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWindowStyled = styled.div`
  padding: 50px 60px;
  position: absolute;
  top: 50%; left: 50%;
  background-color: white;
  transform: translate(-50%, -50%);
`;

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
          <ModalOverlay>
            <ModalWindowStyled>
              <button onClick={onClose}>X</button>
              {children}
              <button onClick={onClose}>Close</button>
            </ModalWindowStyled>
          </ModalOverlay>,
          document.body)}
      </>
    );
  }
}

ModalWindow.propTypes = {
  children: PropTypes.node,
};

ModalWindow.defaultProps = {
  children: ''
};

export default ModalWindow;
