# Research Collective
#### A Submission to the DragonQuest Hackathon
##### A Continuance of the EthDenver project: 'DMV Demolisher'

- **HD wallet** - for generation of pub/priv key pairs
- **P2P chat** - secure peer 2 peer messaging
- **React** — frontend framework
- **[IPFS](https://ipfs.io/)** + **[OrbitDB](https://orbitdb.org/)** — where the data is stored (provided by 3Box, so we don’t need to touch this directly)
- **[MetaMask](https://metamask.io/)** — Web3 wallet integration (required to facilitate signing and encryption of data)
- **[3Box.js](https://docs.3box.io/build/web-apps)** — 3Box SDK that connects wallets to IPFS database storage via 3ID
- React Bootstrap - UI Library

## Installation

### Troubleshooting
If you get Error: ENOENT: no such file or directory, scandir '/home/aitheric/Projects/MultiPass/node_modules/node-sass/vendor'
try running 
nodejs node_modules/node-sass/scripts/install.js
