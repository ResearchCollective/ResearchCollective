export const shortenEthAddr = (str) => {
  const shortenStr = str && `${str.substring(0, 5)}...${str.substring(str.length - 5, str.length)}`;
  return shortenStr;
};

export const timeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval === 1) return interval + " year";
  if (interval > 1) return interval + " years";

  interval = Math.floor(seconds / 2592000);
  if (interval === 1) return interval + " month";
  if (interval > 1) return interval + " months";

  interval = Math.floor(seconds / 86400);
  if (interval === 1) return interval + " day";
  if (interval > 1) return interval + " days";

  interval = Math.floor(seconds / 3600);
  if (interval === 1) return interval + " hour";
  if (interval > 1) return interval + " hours";

  interval = Math.floor(seconds / 60);
  if (interval === 1) return interval + " minute";
  if (interval > 1) return interval + " minutes";

  return Math.floor(seconds) + " seconds";
}

export const sortChronologicallyAndGroup = (threadPosts) => {
  const updatedThreadPosts = threadPosts.sort((a, b) => {
    a = a.timestamp;
    b = b.timestamp;
    return a > b ? 1 : a < b ? -1 : 0;
  });

  const groupedThreadPosts = [];
  let groupedIndex = -1;

  updatedThreadPosts.forEach((post) => {
    if (groupedIndex === -1 || groupedThreadPosts[groupedIndex][groupedThreadPosts[groupedIndex].length - 1].author !== post.author) {
      groupedIndex += 1;
      groupedThreadPosts[groupedIndex] = [];
      groupedThreadPosts[groupedIndex].push(post);
    } else {
      groupedThreadPosts[groupedIndex].push(post);
    }
  });

  return groupedThreadPosts;
}

export const checkIsMobileDevice = () => {
  return ((window && typeof window.orientation !== "undefined")) || (navigator && navigator.userAgent.indexOf('IEMobile') !== -1);
};

export const getCurrentProvider = (ethereum) => {
  if (!window.web3) return 'unknown';

  if (ethereum.isMetaMask)
      return 'metamask';

  if (ethereum.isTrust)
      return 'trust';

  if (ethereum.isGoWallet)
      return 'goWallet';

  if (ethereum.isAlphaWallet)
      return 'alphaWallet';

  if (ethereum.isStatus)
      return 'status';

  if (ethereum.isToshi)
      return 'coinbase';

  if (typeof window.__CIPHER__ !== 'undefined')
      return 'cipher';

  if (ethereum.constructor.name === 'EthereumProvider')
      return 'mist';

  if (ethereum.constructor.name === 'Web3FrameProvider')
      return 'parity';

  if (ethereum.host && ethereum.host.indexOf('infura') !== -1)
      return 'infura';

  if (ethereum.host && ethereum.host.indexOf('localhost') !== -1)
      return 'localhost';
  
  return 'unknown';
}

/**
 *@param {String} messageText
 */

export const isLikeEvent = (messageText) => {
  return /^\/(like|unlike) /.test(messageText)
}

/**
 * 
 * @param {Array} messages 
 * groups likes by target id first,
 * then by author
 */

const groupLikes = (messages) => {

  //using Map instead of object to avoid prototype poisoning vulnerability
  const groupedLikes = new Map()

  for (const { message, author, timestamp } of messages) {
    if (!isLikeEvent(message)) continue

    const [action, targetId] = message.split(" ")

    if (!action || !targetId) continue

    if (!groupedLikes.get(targetId)) {
      groupedLikes.set(targetId, { [author]: [{ action, timestamp }] })
    }
    else {
      const stack = groupedLikes.get(targetId)[author]

      if (stack) {
        stack.push({ action, timestamp })
      }
      else {
        groupedLikes.get(targetId)[author] = [{ action, timestamp }]
      }
    }
  }

  return groupedLikes
}

/**
 * 
 * @param {Array} messages 
 * @returns
 * a mapping from postId to list of user ids 
 * that liked that post
 */

export const resolveLikes = (messages) => {
  const groupedLikes = groupLikes(messages)
  const resolvedLikes = new Map()

  for (const [targetId, targetGroup] of groupedLikes) {

    for (const author in targetGroup) {
      const stack = targetGroup[author].sort((a, b) => b.timestamp - a.timestamp)
      const lastAction = stack[0] && stack[0].action

      if (lastAction !== "/like") {
        continue
      }

      const target = resolvedLikes.get(targetId)
      if (target) {
        target.push(author)
      }
      else {
        resolvedLikes.set(targetId, [author])
      }
    }
  }

  return resolvedLikes
}


// memoization for single-argument function
export const memo = function (func) {
  const cache = new Map()
  return function (arg) {
    const fromCache = cache.get(arg)
    if (fromCache) return fromCache

    const res = func(arg)
    cache.set(arg, res)
    return res
  }
}