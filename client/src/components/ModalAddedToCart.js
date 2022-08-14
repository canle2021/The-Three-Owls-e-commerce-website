import React from "react";

import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalAddedToCart = ({isShowing, hide, message}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <CartAdditonMessage>
          {message}
        </CartAdditonMessage>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

const CartAdditonMessage = styled.div`
  font-weight: bold;
  display:flex;
  justify-content: center;
  font-size: 18px;
`

export default ModalAddedToCart;
