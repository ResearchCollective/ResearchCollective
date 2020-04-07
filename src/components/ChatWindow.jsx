import PropTypes from 'prop-types';
import React, { Component } from 'react';

import incomingMessageSound from '../assets/sounds/notification.mp3';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowOnlineList: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { messageList, profiles, currentUserAddr, mute } = this.props;

    if (mute || !messageList) return;

    const messageGroup = messageList[messageList.length - 1];
    const nextMessage = messageGroup && messageGroup[messageGroup.length - 1];
    const profile = nextMessage && profiles[nextMessage.author];
    const currentUserAddrNormalized = currentUserAddr && currentUserAddr.toLowerCase();
    const commentAddr = profile && profile.ethAddr.toLowerCase();
    const isMyComment = commentAddr === currentUserAddrNormalized;
    const isNew = messageList.length > prevProps.messageList.length;

    if (!isMyComment && isNew) this.playIncomingMessageSound();
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleShowOnlineList = () => {
    const { isShowOnlineList } = this.state;
    this.setState({ isShowOnlineList: !isShowOnlineList });
  }

  render() {
    const {
      currentUser3BoxProfile,
      currentUserAddr,
      agentProfile,
      notPopup,
      onClose,
      profiles,
      likes,
      showEmoji,
      colorTheme,
      membersOnlineLength,
      ethereum,
      userProfileURL,
      membersOnline,
      postMessage,
      popupChat,
      isJoiningThread,
    } = this.props;

    const { isShowOnlineList } = this.state;

    let messageList = this.props.messageList || [];

    const chatWindowClassList = [
      'sc-chat-window',
      ((notPopup || this.props.isOpen) ? 'opened' : 'closed')
    ];

    return (
      <div className={notPopup ? 'chat' : 'popupChat'} id={`${notPopup ? 'sc-launcher' : ''}`}>
        <div className={chatWindowClassList.join(' ')}>
          <Header
            chatName={agentProfile.chatName}
            imageUrl={agentProfile.imageUrl}
            handleShowOnlineList={this.handleShowOnlineList}
            onClose={onClose}
            colorTheme={colorTheme}
            membersOnlineLength={membersOnlineLength}
            isShowOnlineList={isShowOnlineList}
            ethereum={ethereum}
            popupChat={popupChat}
            userProfileURL={userProfileURL}
            currentUserAddr={currentUserAddr}
          />

          <MessageList
            messages={messageList}
            likes={likes}
            imageUrl={agentProfile.imageUrl}
            handleShowOnlineList={this.handleShowOnlineList}
            currentUserAddr={currentUserAddr}
            profiles={profiles}
            userProfileURL={userProfileURL}
            colorTheme={colorTheme}
            isShowOnlineList={isShowOnlineList}
            membersOnline={membersOnline}
            postMessage={postMessage}
            isJoiningThread={isJoiningThread}
            ethereum={ethereum}

          />

          <UserInput
            currentUser3BoxProfile={currentUser3BoxProfile}
            currentUserAddr={currentUserAddr}
            postMessage={postMessage}
            showEmoji={showEmoji}
            userProfileURL={userProfileURL}
            ethereum={ethereum}
          />
        </div>
      </div >
    );
  }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  ethereum: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  postMessage: PropTypes.func.isRequired,
  userProfileURL: PropTypes.func,
  showEmoji: PropTypes.bool,
  mute: PropTypes.bool,
  notPopup: PropTypes.bool,
  isShowOnlineList: PropTypes.bool,
  noWeb3: PropTypes.bool,
  isJoiningThread: PropTypes.bool,
  currentUser3BoxProfile: PropTypes.object,
  currentUserAddr: PropTypes.string,
  colorTheme: PropTypes.string,
  profiles: PropTypes.object,
  popupChat: PropTypes.bool,
  messageList: PropTypes.array,
  likes: PropTypes.instanceOf(Map),
  membersOnline: PropTypes.array,
  membersOnlineLength: PropTypes.number,
};

export default ChatWindow;
