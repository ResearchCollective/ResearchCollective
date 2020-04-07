# MultiPass
#### Submiteted to  EthDenver 2020 as the DMV Demolisher
Youtube demo: https://youtu.be/RY-EJfxOj2o

## Summary:
This app, DMV Demolisher, is a credential wallet and messaging app based on 3box.
It allows users to selectively reveal any single credential the identity has been given. 

This app was designed to provide a user interface for both ciizens and clerks to begin using Web 3.0 features.

This project, as Multipass, is an ongoing effort to provide robust identity management for all of us who are decentralizing.
## Setup and Tech Stack

For the tutorial, some familiarity with react is required. You can complete by copying and pasting each step, but to get a more meaningful understanding, it is recommended you are familiar with the basics.

- **HD wallet** - for generation of pub/priv key pairs
- **P2P chat** - secure peer 2 peer messaging
- **React** — frontend framework
- **[IPFS](https://ipfs.io/)** + **[OrbitDB](https://orbitdb.org/)** — where the data is stored (provided by 3Box, so we don’t need to touch this directly)
- **[MetaMask](https://metamask.io/)** — Web3 wallet integration (required to facilitate signing and encryption of data)
- **[3Box.js](https://docs.3box.io/build/web-apps)** — 3Box SDK that connects wallets to IPFS database storage via 3ID
- React Bootstrap - UI Library

