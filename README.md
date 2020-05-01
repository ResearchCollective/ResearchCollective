# Research Collective
#### A Submission to the DragonQuest Hackathon

**[Video Demonstration](https://www.youtube.com/watch?v=PYa-3dqNT7I)**

#### The Research Collective is a...
- Group of Citizen Scientists 
- A Wyoming Non-Profit / Aragon DAO Hybrid
- The first "Knowledge Foundation"; developing curated lists for sensitive if not underregulated topics such as
   - Research Chemical Suppliers
   - Pre-print Articles Screening
   - COVID Test Kits
   
##### *User Stories for this app:*
- I want to be able to find testing kits, anti virals, and articles for COVID-19. 
- I want to know why a particular article or vendor is trustworthy. 
- I want to be able to post a resource for testing kits or anti virals.
- I want to be able to challenge some one else's listing, and receive the scammer's stake if arbitration deem it be removed.
*First use case completed for DragonQuest; others will be developed over future hackathons*

##### *Mockups / Specifications*
These first three docs were all made in the first two weeks of the DragonQuest hackathon
- [Backend](https://researchcollective.io/specs/backend.jpg)
- [User Flow](https://researchcollective.io/specs/site-flow.jpg)
- [Registry Mockup](https://researchcollective.io/specs/mockup-registry.jpg)
- [Meta Roadmap (A Part of the Etherize Super Plan)](https://researchcollective.io/specs/etherize-roadmap.jpg)


##### Tech Added for DragonQuest Hackathon:
- **[Aragon UI](https://ui.aragon.org/)** - a dark theme and Web3-focused styling
- **[TheGraph](https://thegraph.com/explorer/subgraph/protofire/aragon)** - for accessing Aragon DAO information 

##### Tech Included from EthDenver 2020 project: 'DMV Demolisher'
- **HD wallet** - for generation of pub/priv key pairs
- **P2P chat** - secure peer 2 peer messaging
- **React** — frontend framework
- **[IPFS](https://ipfs.io/)** + **[OrbitDB](https://orbitdb.org/)** — where the data is stored (provided by 3Box, so we don’t need to touch this directly)
- **[MetaMask](https://metamask.io/)** — Web3 wallet integration (required to facilitate signing and encryption of data)
- **[3Box.js](https://docs.3box.io/build/web-apps)** — 3Box SDK that connects wallets to IPFS database storage via 3ID
- React Bootstrap - UI Library

## Installation
npm run build

npm run start

You will need Python 2.7x installed, and...

### Troubleshooting
If you get Error: ENOENT: no such file or directory, scandir '/home/aitheric/Projects/MultiPass/node_modules/node-sass/vendor'
try running: nodejs node_modules/node-sass/scripts/install.js
