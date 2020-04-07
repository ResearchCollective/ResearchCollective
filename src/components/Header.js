import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import { getCurrentProvider } from '../utils';
import closeIcon from '../assets/close-icon.svg';
import Chat from '../assets/chat-bubble.svg';

class Header extends Component {

  render() {
    const {
      imageUrl,
      chatName,
      onClose,
      colorTheme,
      membersOnlineLength,
      ethereum,
      handleShowOnlineList,
      isShowOnlineList,
      popupChat,
      userProfileURL,
      currentUserAddr,
    } = this.props;

    const url = userProfileURL ? userProfileURL(currentUserAddr) : `https://3box.io/login?wallet=${getCurrentProvider(ethereum)}`;

    return (
      <div className="sc-header" style={{ backgroundColor: colorTheme }}>
        <div className="sc-header_details">
          {imageUrl ? <img className="sc-header--img" src={imageUrl} alt="Chat Profile" />
            : <SVG src={Chat} alt="Logo" className="sc-header--img default" />
          }

          <div className="sc-header--team-name">
            <h3 className="sc-header--team-name_text">
              {chatName}
            </h3>

            <p
              className={`sc-header--team-name_membersOnline ${isShowOnlineList ? 'active' : ''}`}
              onClick={handleShowOnlineList}
            >
              {`${membersOnlineLength} online`}
            </p>
          </div>
        </div>

        <div className="sc-header--right">
          <a
            href={url}
            className="sc-header-updateProfile"
            target={userProfileURL ? '_self' : '_blank'}
            rel={userProfileURL ? 'dofollow' : 'noopener noreferrer'}
          >
            Edit profile
          </a>

          {popupChat && (
            <div className="sc-header--close-button" onClick={onClose}>
              <SVG src={closeIcon} alt="Close" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  imageUrl: PropTypes.string,
  chatName: PropTypes.string,
  colorTheme: PropTypes.string,
  currentUserAddr: PropTypes.string,
  onClose: PropTypes.func,
  membersOnlineLength: PropTypes.number,
  isShowOnlineList: PropTypes.bool,
  popupChat: PropTypes.bool,
  ethereum: PropTypes.object,
  handleShowOnlineList: PropTypes.func.isRequired,
  userProfileURL: PropTypes.func,
};

export default Header;
