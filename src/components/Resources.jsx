import React, { Component } from 'react';
import {Box, IconExternal} from '@aragon/ui';
import VoteTable from './VoteTable';
import PostItemModal from './credentials/RequestCredential';
import * as Constants from '../constants';

//You can get the right address by finding a vote using the Subgraph explorer
//And getting the 'Creator' address for the vote

class Resources extends Component {
    state = {
        box:false,
        address:false,
    };

   render() {
      return (
          <div>
             <h1 className="sectionTitle "> Resources </h1>
             <p className="sectionSubTitle"> passed by the Rinkeby DAO <a  rel="noopener noreferrer" target="_blank" href="https://rinkeby.aragon.org/#/covidresearch">'covidresearch' <IconExternal style={{position: "relative", top: "-2px"}} size="medium"/> </a>   </p>
             <Box style={{display: "inline"}}>
             <VoteTable  network="rinkeby" creatorId={Constants.COVIDRESEARCH_RINKEBY} columns={Constants.COLUMNS_VOTES}/>
             <PostItemModal className="pushDown"/>
             </Box>
          </div>
    );
  }
}

export default Resources;
