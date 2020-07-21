import React, { Component } from 'react';
import {Box, IconExternal} from '@aragon/ui';
import Registry from './Registry';
import VoteTable from './VoteTable';
import PostItemModal from './credentials/RequestCredential';


class Resources extends Component {
    //ID for covidresearch DAO's voting smart contract is specified below
    state = {
        box:false,
        address:false,
        // rc   voting id  0xb0cff1400bc4d39f030d01af00d118bb5cf4ab24
        //  voteId: "0xb0cff1400bc4d39f030d01af00d118bb5cf4ab24",
        //covidresearch voting id 0x8f409307ecdd0cb567ae433a54ec9767ff585618
        voteId: "0x8f409307ecdd0cb567ae433a54ec9767ff585618",
        columns: ['Description', 'Poster', 'Link']
    };



   render() {
      return (
          <div>
            <h1 className="sectionTitle "> Resources </h1>
             <PostItemModal className=" sectionBreak" />
             <p className="narrativeTitle"> passed by the DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'covidresearch' <IconExternal style={{position: "relative", top: "-2px"}} size="large"/> </a>   </p>
             <Box  className=""  style={{display: "inline"}}>
             <VoteTable address="0x9FDA9424B0d25aA3BED1157Ce834fC3A43a81150"/>
          //   <Registry box={this.props.box} voteId={this.state.voteId} columns={this.state.columns} address={this.props.address}/>
             <p className="narrativeTitle"> submitted by the Telegram DAO <a  rel="noopener noreferrer" target="_blank" href="https://t.me/ResearchCollectiveBot">'rc' <IconExternal style={{position: "relative", top: "-2px"}} size="large"/> </a>   </p>
              //   <Registry box={this.props.box} voteId={"0xb0cff1400bc4d39f030d01af00d118bb5cf4ab24"} columns={this.state.columns} address={this.props.address}/>
             </Box>
          </div>
    );
  }
}

export default Resources;
