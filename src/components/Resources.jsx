import React, { Component } from 'react';
import {Box, IconExternal} from '@aragon/ui';
import Registry from './Registry';
import PostItemModal from "./credentials/RequestCredential";

class Resources extends Component {
    //ID for covidresearch DAO's voting smart contract is specified below
    state = {
        box:false,
        address:false,
        voteId: "0x8f409307ecdd0cb567ae433a54ec9767ff585618",
        columns: ['Description', 'Poster', 'Link']
    };


render() {
      return (
          <div>
            <h1 className="sectionTitle"> Resources </h1>
            <p className="sectionSubTitle"> passed by the expert DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'Covid Research' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
             <Box style={{display: "inline"}}>
               <Registry box={this.props.box} voteId={this.state.voteId} columns={this.state.columns} address={this.props.address}/>
            </Box>
            <PostItemModal/>
          </div>
    );
  }
}




export default Resources;
