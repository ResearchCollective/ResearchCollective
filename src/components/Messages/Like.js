import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { shortenEthAddr } from '../../utils';

import LikeIcon from "../icons/LikeIcon"

class LikersList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { likers, showLikers, hideLikers, isMyComment } = this.props
    if (!likers) return null

    return (
      <div className={`sc-message-likers-wrapper ${isMyComment ? 'isMyComment' : ''}`}
        onMouseEnter={showLikers}
        onMouseLeave={hideLikers}
      >
        {likers.slice(0, 5).map((profile, i) => {
          return <a key={i}
            href={profile.profileURL}
            target='_blank'
            rel='noopener noreferrer'
          >
            <p>
              {profile.name || shortenEthAddr(profile.ethAddr)}
            </p>
            {i !== (likers.length - 1) && <p className="likers-separator">,</p>}
          </a>
        })}
      </div>
    )
  }
}


function isLikedByCurrUser(likers, currentUserAddr) {
  if (!likers || !currentUserAddr) return false
  return new Set(likers.map(author => author.ethAddr.toLowerCase())).has(currentUserAddr.toLowerCase())
}

class Like extends Component {
  constructor(props) {
    super(props);
    const { likers, currentUserAddr } = this.props
    this.state = {
      liked: isLikedByCurrUser(likers, currentUserAddr),
      showLikers: false,
      enterTimer: null,
      leaveTimer: null,
      showLikeButton: false,
    }
    this.ref = createRef()
  }

  componentDidUpdate() {
    // change absolute positioning if it causes overflow
    const chatWindow = document.querySelector(".sc-chat-window")
    const likers = this.ref.current.querySelector(".sc-message-likers-wrapper")
    if (likers && chatWindow) {
      if (likers.getBoundingClientRect().right > chatWindow.getBoundingClientRect().right) {
        likers.style.right = "0px"
      }
    }
  }

  componentWillUnmount() {
    const { enterTimer, leaveTimer } = this.state
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
  }

  clickHandler = (e) => {
    e.preventDefault()
    const { postMessage, messageObj } = this.props

    postMessage({
      author: 'me',
      type: 'text',
      data: { text: `/${this.state.liked ? "un" : ""}like ${messageObj.postId}` }
    })

    this.setState((state) => {
      return { ...state, liked: !state.liked, showLikeButton: true }
    })
  }

  showLikers = () => this.setState({ showLikers: true });

  hideLikers = () => this.setState({ showLikers: false });

  render() {
    const { likers, isMyComment } = this.props;
    const { showLikeButton } = this.state;
    return (
      <div
        className={`sc-message-like-wrapper ${(likers || showLikeButton) ? 'show' : ''}`}
        title=""
        ref={this.ref}
        onClick={this.clickHandler}
      >
        {this.state.showLikers &&
          <LikersList
            likers={likers}
            isMyComment={isMyComment}
            showLikers={this.showLikers}
            hideLikers={this.hideLikers}
          />
        }

        <div
          className="sc-message-like-container"
          onMouseEnter={this.showLikers}
          onMouseLeave={this.hideLikers}
        >
          <LikeIcon isLiked={this.state.liked} />
          <p> {likers && likers.length} </p>
        </div>
      </div>
    )
  }
}

Like.propTypes = {
  likers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  postMessage: PropTypes.func,
  messageObj: PropTypes.object,
  currentUserAddr: PropTypes.string,
  isMyComment: PropTypes.bool,
};

LikersList.propTypes = {
  likers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  showLikers: PropTypes.func,
  hideLikers: PropTypes.func,
  isMyComment: PropTypes.bool,
}

export default Like