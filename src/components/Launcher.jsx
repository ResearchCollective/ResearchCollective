import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import ChatWindow from './ChatWindow';
import launcherIconActive from '../assets/close-icon.svg';
import Chat from '../assets/chat-bubble.svg';

import styles from '../styles';

class Launcher extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  handleClick() {
    const { handleClick } = this.props;
    if (handleClick !== undefined) {
      handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    const {
      currentUserAddr,
      currentUser3BoxProfile,
      colorTheme,
      postMessage,
      isOpen,
      agentProfile,
      messageList,
      likes,
      showEmoji,
      profiles,
      mute,
      membersOnlineLength,
      noWeb3,
      ethereum,
      userProfileURL,
      membersOnline,
      newMessagesCount,
      loginFunction,
      box,
      popupChat,
      isJoiningThread,
    } = this.props;

    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];
    return (
      <div id="sc-launcher">
        <div
          className={classList.join(' ')}
          onClick={this.handleClick.bind(this)}
          style={{ backgroundColor: colorTheme }}
        >
          {(newMessagesCount !== 0 && isOpen === false) && <div className={'sc-new-messages-count'}> {newMessagesCount} </div>}
          <SVG className="sc-open-icon" src={launcherIconActive} />
          <SVG src={Chat} alt="Logo" className="sc-closed-icon" />
        </div>

        <ChatWindow
          messageList={messageList}
          likes={likes}
          postMessage={postMessage}
          agentProfile={agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={showEmoji}
          profiles={profiles}
          currentUser3BoxProfile={currentUser3BoxProfile}
          currentUserAddr={currentUserAddr}
          colorTheme={colorTheme}
          membersOnlineLength={membersOnlineLength}
          mute={mute}
          ethereum={ethereum}
          noWeb3={noWeb3}
          userProfileURL={userProfileURL}
          membersOnline={membersOnline}
          loginFunction={loginFunction}
          isJoiningThread={isJoiningThread}
          box={box}
          popupChat={popupChat}
        />
      </div>
    );
  }
}

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  postMessage: PropTypes.func,
  userProfileURL: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  loginFunction: PropTypes.func,
  messageList: PropTypes.array,
  likes: PropTypes.instanceOf(Map),
  membersOnline: PropTypes.array,
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
  isJoiningThread: PropTypes.bool,
  popupChat: PropTypes.bool,
  noWeb3: PropTypes.bool,
  currentUserAddr: PropTypes.string,
  colorTheme: PropTypes.string,
  agentProfile: PropTypes.object,
  currentUser3BoxProfile: PropTypes.object,
  profiles: PropTypes.object,
  ethereum: PropTypes.object,
  box: PropTypes.object,
  membersOnlineLength: PropTypes.number,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
};

export default Launcher;