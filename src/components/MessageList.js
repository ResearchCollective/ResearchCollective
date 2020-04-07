import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';

import { shortenEthAddr } from '../utils';

import LoadingAnimation from './LoadingAnimation';
import Message from './Messages';
import closeIcon from '../assets/close-icon-black.svg';
import {sha256} from "js-sha256";
import Box from '3box';

class MessageList extends Component {
  componentDidUpdate(prevProps) {

    const moreGroups = this.props.messages.length > prevProps.messages.length

    if (moreGroups) {
      this.scrollList.scrollTop = this.scrollList.scrollHeight;
      return
    }

    const messageGroup = this.props.messages[this.props.messages.length - 1]
    const prevMessageGroup = prevProps.messages[prevProps.messages.length - 1]

    if (messageGroup && prevMessageGroup && messageGroup.length > prevMessageGroup.length) {
      this.scrollList.scrollTop = this.scrollList.scrollHeight;
    }
  }

  render() {
    const {
      messages,
      likes,
      profiles,
      currentUserAddr,
      colorTheme,
      userProfileURL,
      isShowOnlineList,
      membersOnline,
      handleShowOnlineList,
      postMessage,
      isJoiningThread,
      ethereum
    } = this.props;

    return (
      <>
        <div className={`onlineList ${isShowOnlineList ? 'show' : ''}`} ref={el => this.scrollList = el}>
          <span className="onlineList_header">
            <div className="onlineList_header_group">
              <div className="onlineList_onlineIcon" />
              <p>Users online</p>
            </div>

            <div className="sc-header--close-button closeOnlineList" onClick={handleShowOnlineList}>
              <SVG src={closeIcon} alt="Close" />
            </div>
          </span>

          <div className="onlineList_members">
            {membersOnline.map(memberDID => {
              const isMe = memberDID === currentUserAddr;
              const profile = profiles[isMe ? currentUserAddr : memberDID];
              const profilePicture = (profile && profile.ethAddr) &&
                (profile.image ? `https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`
                  : makeBlockie(profile.ethAddr));

              if(!profile) return <div>nada</div>;

              return (
                <a
                  href={profile.profileURL}
                  className="onlineList_members_link"
                  target={userProfileURL ? '_self' : '_blank'}
                  rel={userProfileURL ? 'dofollow' : 'noopener noreferrer'}
                  key={memberDID}
                >
                  <div className="onlineList_members_profile">
                    <img
                      className="sc-message--avatar comment_picture comment_picture-bgWhite"
                      src={profilePicture}
                      alt="profile"
                    />
                    <h4 className="onlineList_members_profile_name">
                      {profile.name || shortenEthAddr(profile.ethAddr)}
                    </h4>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <div className={`sc-message-list ${isJoiningThread ? 'isLoading' : ''} ${isShowOnlineList ? '' : 'show'}`} ref={el => this.scrollList = el}>
          {isJoiningThread && (
            <LoadingAnimation colorTheme={colorTheme} threadLoading={isJoiningThread} />
          )}

          {messages.map((userGrouping, i) => {
            const profile = profiles[userGrouping[0].author];
            const currentUserAddrNormalized = currentUserAddr && currentUserAddr.toLowerCase();
            const commentAddr = profile && profile.ethAddr.toLowerCase();
            const isMyComment = commentAddr === currentUserAddrNormalized;

            return (
              <div className={`sc-message_group ${isMyComment ? 'myGroup' : ''}`} key={i}>
                {userGrouping.map((message, i) => {

                  const likers = likes.get(message.postId) && likes.get(message.postId).map((author) => profiles[author])

                  return (
                    <Message
                      message={message}
                      likers={likers}
                      userProfileURL={userProfileURL}
                      membersOnline={membersOnline}
                      key={i}
                      currentUserAddr={currentUserAddr}
                      profile={profiles[message.author]}
                      isFirstMessage={i === 0}
                      colorTheme={colorTheme}
                      postMessage={postMessage}
                      onClickHash={ ()=> {
                        const hash = sha256.create();
                        hash.update(message.message);
                        const hashHex = hash.hex();
                        // console.log(membersOnline);
                        const otherChatter = membersOnline.find(chatter=>chatter.memberDID !== currentUserAddr);
                        Box.getConfig(otherChatter).then( response => {
                          const otherChatterEthAddress = response.links[0].address;
                          console.log("sending to: " + otherChatterEthAddress);
                          const params = [{
                            "from": currentUserAddr,
                            "to": otherChatterEthAddress,
                            "gas": "0x76c0", // 30400
                            "gasPrice": "0x84e72a000", // 10000000000000
                            "value": "0x0", // 2441406250
                            "data": "message hash: " + hashHex,
                          }]
                          ethereum.sendAsync(
                              { method: 'eth_sendTransaction', params },
                              (err, response) => {

                                if (err || response.error) {
                                  console.log(err || response.error)
                                } else {
                                  const { result } = response
                                  console.log(result)
                                }
                              })
                        })

                      }}
                      onClickStash={()=>{
                        const otherChatter = membersOnline.find(chatter=>chatter.memberDID !== currentUserAddr);
                        Box.getConfig(otherChatter).then( response => {
                          const otherChatterEthAddress = response.links[0].address;
                          console.log("sending to: " + otherChatterEthAddress);
                          const params = [{
                            "from": currentUserAddr,
                            "to": otherChatterEthAddress,
                            "gas": "0x76c0", // 30400
                            "gasPrice": "0x84e72a000", // 10000000000000
                            "value": "0x0", // 2441406250
                            "data": "message: " + message.message,
                          }]
                          ethereum.sendAsync(
                              { method: 'eth_sendTransaction', params },
                              (err, response) => {

                                if (err || response.error) {
                                  console.log(err || response.error)
                                } else {
                                  const { result } = response
                                  console.log(result)
                                }
                              })
                        })

                      }}
                    />
                  );
                })}
              </div>
            )
          })}
        </div>
      </>
    );
  }


}

MessageList.propTypes = {
  messages: PropTypes.array,
  likes: PropTypes.instanceOf(Map),
  membersOnline: PropTypes.array,
  profiles: PropTypes.object,
  currentUserAddr: PropTypes.string,
  colorTheme: PropTypes.string,
  userProfileURL: PropTypes.func,
  handleShowOnlineList: PropTypes.func.isRequired,
  isShowOnlineList: PropTypes.bool,
  postMessage: PropTypes.func,
  isJoiningThread: PropTypes.bool,
};

export default MessageList;
