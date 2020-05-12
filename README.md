# Research Collective
#### A Submission to the Stop Covid-19 Hackathon

**[Pitch Deck](https://drive.google.com/open?id=11UhpG4ZZo3Ar2gRrUZNXHn3TiNRLEdm0I9YhrRuyjFQ)**
**[Video Demonstration](https://www.youtube.com/watch?v=PYa-3dqNT7I)**

#### The Research Collective is a...
- Group of Citizen Scientists
- A Wyoming Non-Profit / Aragon DAO Hybrid
- A first "Knowledge Foundation"; developing curated lists for sensitive, if not underregulated topics such as
   - Research Materials Suppliers
   - Pre-print Articles Screening
   - COVID Test Kits & Anti Virals

##### *User Stories for this app:*
- I want to be able to find testing kits, anti virals, and articles for COVID-19.
- I want to know why a particular article or vendor is trustworthy.
- I want to be able to post a resource for testing kits or anti virals.
- I want to be able to challenge some one else's listing, and receive the scammer's stake if arbitration deem it be removed.
*First use case completed for Stop COVID-19; others will be developed over DAIA hackathon*

##### Tech Stack:
- **[Aragon UI](https://ui.aragon.org/)** - a dark theme and Web3-focused styling
- **[TheGraph](https://thegraph.com/explorer/subgraph/protofire/aragon)** - for accessing Aragon DAO information
- **HD wallet** - for generation of pub/priv key pairs
- **React** — frontend framework
- **[IPFS](https://ipfs.io/)** + **[OrbitDB](https://orbitdb.org/)** — where the data is stored (provided by 3Box, so we don’t need to touch this directly)
- **[MetaMask](https://metamask.io/)** — Web3 wallet integration (required to facilitate signing and encryption of data)
- **[3Box.js](https://docs.3box.io/build/web-apps)** — 3Box SDK that connects wallets to IPFS database storage via 3ID

## Installation
npm run build

npm run start

You will need Python 2.7x installed, and...

### Troubleshooting
If you get Error: ENOENT: no such file or directory, scandir '/home/aitheric/Projects/MultiPass/node_modules/node-sass/vendor'
try running: nodejs node_modules/node-sass/scripts/install.js
