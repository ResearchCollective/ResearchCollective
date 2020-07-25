import React, { Component } from 'react';
import {Box, IconExternal} from '@aragon/ui';
import VoteTable from './VoteTable';
import PostItemModal from './credentials/RequestCredential';
import * as Constants from '../constants';

//You can get the right address by finding a vote using the Subgraph explorer
//And getting the 'Creator' address for the vote

const CURATION_COLUMNS = ['Description', 'Poster', 'URL'];

//const  RC_MAIN = 0xb0cff1400bc4d39f030d01af00d118bb5cf4ab24

class Resources extends Component {
    //ID for covidresearch DAO's voting smart contract is specified below
    state = {
        box:false,
        address:false,
    };

   render() {
      return (
          <div>
            <h1 className="sectionTitle "> Resources </h1>
             <PostItemModal className=" sectionBreak" />
             <p className="narrativeTitle"> passed by the DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'covidresearch' <IconExternal style={{position: "relative", top: "-2px"}} size="large"/> </a>   </p>
             <Box  className=""  style={{display: "inline"}}>
             <VoteTable network="rinkeby" type="vote" creatorId={Constants.COVIDRESEARCH_RINKEBY} columns={CURATION_COLUMNS} address={this.props.address}/>
             </Box>
          </div>
    );
  }
}

export default Resources;
