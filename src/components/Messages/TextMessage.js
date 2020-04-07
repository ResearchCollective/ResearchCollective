import React from 'react';
import Linkify from 'react-linkify';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

const TextMessage = ({ isMyComment, colorTheme, messageObj, onClickHash, onClickPersist }) => (
  <div
    className="sc-message--text"
    style={{ backgroundColor: isMyComment ? colorTheme : '#ececec'}}
  >
    <Button size={"sm"} style={{marginRight:"10px"}} onClick={onClickHash}> hash </Button>
    <Button size={"sm"} style={{marginRight:"10px", marginLeft:"5px"}} onClick={onClickPersist}> publish </Button>

    <Linkify properties={{ target: '_blank' }}>
      {messageObj.message}
    </Linkify>
  </div>
);

TextMessage.propTypes = {
  isMyComment: PropTypes.bool,
  colorTheme: PropTypes.string,
  messageObj: PropTypes.object,
};

export default TextMessage;
