import React from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';

const qr = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <QRCode value="http://facebook.github.io/react/" />
    </React.Fragment>, document.body
) : null;

export default qr;
