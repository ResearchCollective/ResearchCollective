# Research Collective

## A registry of trustworthy COVID-19 resources, curated by an already existing community of citizen scientists

### DAIA hackathon deliverables

**[Live Site](https://researchcollective.io)**

**[Pitch Deck](https://docs.google.com/presentation/d/16ukIjYRFOGal9BN4aYr942aYr1-9kDYrHVlPd_D6Yoc)**

**[Video Demonstration](https://www.youtube.com/watch?v=jAl696Un0zU)**

### How It All Started

The Covid-19 crisis has been a wake up call for many, putting forward the [failures and problems](https://www.notion.so/Problems-5f4b49430daa479bad4d63407559adb0) of traditional actors. Overall, canonical medical institutions have been burdened by their many inefficiencies and conflicts of interests. Failing to sustain their legitimacy in the eyes of the general public and eventually failing to build the necessary momentum to fight the sanitary crisis. 

We think that these symptoms reveal threats to the pace of progress in science. By leveraging Web3 tools, ResearchCollective is looking to make up for these flaws and re-equip the world of science with more efficient, transparent and trustworthy processes.


### **The Research Collective is a...**

- Group of Citizen Scientists
- A Wyoming Non-Profit / Aragon DAO Hybrid
- A first "Knowledge Foundation"; developing curated lists for sensitive, if not underregulated topics such as
    - Research Materials Suppliers: [state the problem solved in 1 line]
    - Pre-print Articles Screening: [state the problem solved in 1 line]
    - COVID Test Kits & Anti Virals: [state the problem solved in 1 line]
    

### What can I do with the solution?

- I want to be able to find testing kits, anti virals, and articles for COVID-19.
- I want to know why a particular article or vendor is trustworthy.
- I want to be able to post a resource for testing kits or anti virals.
- I want to be able to challenge some one else's listing, and receive the scammer's stake if arbitration deem it be removed. *First use case completed for Stop COVID-19; others will be developed over DAIA hackathon*

### The Tech Stack

- **[Aragon UI](https://ui.aragon.org/)** - a dark theme and Web3-focused styling
- [Abridged.io](https://www.abridged.io/) - a Telegram bot that let's you interact with an Aragon DAO
- [Aragon](https://aragon.org/) - a DAO framework that let ResearchCollective experts vote and curate
- [Verifiable Claims](https://www.w3.org/TR/vc-data-model/) - a submission system which lets anyone propose new articles, tests or vendors
- **[TheGraph](https://thegraph.com/explorer/subgraph/protofire/aragon)** - for accessing Aragon DAO information
- **HD wallet** - for generation of pub/priv key pairs
- **React** — frontend framework
- **[IPFS](https://ipfs.io/)** + **[OrbitDB](https://orbitdb.org/)** — where the data is stored (provided by 3Box, so we don’t need to touch this directly)
- **[MetaMask](https://metamask.io/)** — Web3 wallet integration (required to facilitate signing and encryption of data)
- **[3Box.js](https://docs.3box.io/build/web-apps)** — 3Box SDK that connects wallets to IPFS database storage via 3ID

### Challenges we ran into

- Staking and the registry app - [detailed how and why it was hard to implement staking]
- Arbitration
    - Aragon Court is not ready to be used for our purpose.
- Revenue generation and incentives
    - We still ahve to figure out the exact spec of the cryptoeconomic incentives that work on top of the solution

### Accomplishments that we are proud of

Getting things to work!

### What we've learned

There are still missing pieces for ExpertDAOs to function at their full potention.

### What's next for Research Collective

Check what we're up to for the long term here:

[Sequence](https://www.notion.so/Sequence-358e3c69407a4c1eba72dd9d59987b29)

## Installation
npm run build

npm run start

You will need Python 2.7x installed, and...

### Troubleshooting
If you get Error: ENOENT: no such file or directory, scandir '/home/aitheric/Projects/MultiPass/node_modules/node-sass/vendor'
try running: nodejs node_modules/node-sass/scripts/install.js
