import React, { Component } from 'react';
import {  Box, IconExternal, Split } from '@aragon/ui';
import VoteTable from './VoteTable';
import MemberTable from './MemberTable';
import * as Constants from '../constants';

class Votes extends Component {

render() {
      return (
          <div>
            <h1 className="sectionTitle"> Votes </h1>
            <Split
             primary={
                       <div>
                       <p className="sectionSubTitle"> Votes passed by the <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/research/0x1a403fb012914a543e0d3bbe459de9636d3951fd/">'Research Collective' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
                        <VoteTable network="mainnet" columns={Constants.COLUMNS_VOTES} creatorId={Constants.RESEARCH_MAINNET} address={this.props.address}/>
                        <br/>
                        <p className="sectionSubTitle"> Directors of the  <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/research/0xc6c1725868210736c3bcb784b4c13c6412823096/">'Research Collective' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a></p>
                        <MemberTable network="mainnet" columns={Constants.COLUMNS_MEMBERS} appAddress={Constants.RESEARCH_MAINNET} />
                       </div>
                     }
             secondary={
               <>
                 <Box className="pushDown2">
                    <h3 className=" fullWidth centerText"><i> Announcements</i></h3>
                    <iframe title="Research Collective Telegram channel feed - not the same as group chat"  id="preview" className="telegramBox" src="https://xn--r1a.website/s/ResearchCollective"></iframe>
                 </Box>
               </>
             }> </Split>

            </div>
    );
  }
}




export default Votes;
