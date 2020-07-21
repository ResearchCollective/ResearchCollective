import React, {Component, useState, useEffect } from "react";
import { connect, describeScript } from "@aragon/connect";
import { Voting } from "@aragon/connect-thegraph-voting";
import {Button, IconExternal, Box, DataView} from '@aragon/ui';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';

// Empty script; votes that do not execute any actions will contain this.
const EMPTY_SCRIPT = "0x00000001";
// The desiredDAO Address.
//const DAO_ADDRESS = "0x9FDA9424B0d25aA3BED1157Ce834fC3A43a81150";
const DAO_ADDRESS = "covidresearch.aragonid.eth";
// The URL of the corresponding subgraph.
const VOTING_SUBGRAPH_URL =
//  "https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby";
   "https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet";

// Helper function for processing votes
async function processVote(vote, apps) {
  if (vote.script === EMPTY_SCRIPT) {
    return { ...vote, link: "link", poster:"poster"};;
  }
  console.log("Vote script: " + vote.script);
  const [{ description }] = await describeScript(vote.script, apps);
  vote.poster = "poster";
  vote.link = "link";
  return { ...vote, metadata: description, link: "link", poster:"poster"};
}

export default function VoteTable(address) {
  const [latestVote, setLatestVote] = useState(null);
  const [votes, setVotes] = useState(null);

  useEffect(() => {
    async function getVotes() {
      // STEP 1: Connecting

      // Let's connect to a rinkeby org;
      // we just need the address, type of provider, and chainId.

      const org = await connect(
        // Org address...
        DAO_ADDRESS,
        // Connector type
        "thegraph",
        // Chain ID, if connecting to Rinkeby rather than mainnet.
        //{ chainId: 4 }
      );

      // STEP 2: Fetching and initializing the Voting App
      const { address: votingAppAddress } = await org.app("voting");
      const apps = await org.apps();

      // Initialize the voting app,
      // We'll need the voting app address and the Subgraph URL for voting.
      // The last parameter activates or disables verbose logging.
      // We'll set it to true to see what's happening under the hood.
      const voting = new Voting(votingAppAddress, VOTING_SUBGRAPH_URL, true);

      // To fetch the votes, just call votes(). :)
      // There's also pagination!
      const votes = await voting.votes();
      const processedVotes = await Promise.all(
        votes.map(async vote => processVote(vote, apps))
      );
      processedVotes.reverse();
      setVotes(processedVotes);
      setLatestVote(processedVotes[0].metadata);
    }
    getVotes();
  }, []);

  if (!votes) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
        <h1>
          (DAO NAME) has a total of {votes.length} votes.
        </h1>
        <h3>Votes:</h3>
        <div className="container">
        <DataView  theme={'light'}
           fields={['Description','Poster','Link']}
           // entries is a list of items
           entries={votes}
        //   renderEntryExpansion={({description}) => {
        //         return<Box  className="fullSize flexContainer"><ItemComment   box={this.props.box} address={this.props.address} did={description} /></Box>;
        //     }
        //   }
           renderEntry={({metadata, poster, link}) => {
               return [<h1 style={{width: "100%"}}>{metadata}</h1>, <h1>{poster}</h1>,<h1> {link} </h1>]
            }
          }
       />
      </div>
    </div>
  );
}

  class ItemComment extends Component {
    render() {
      return (<>

          {this.props.box && this.props.address &&
            <ThreeBoxComments
                // required
                spaceName="researchCollective"
                threadName={this.props.did}
                adminEthAddr={this.props.address}

                // Required props for context A) & B)
                box={this.props.box}
                currentUserAddr={this.props.address}
            />
      }
    </>
  )
}
}
