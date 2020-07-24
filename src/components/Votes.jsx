import React, { Component } from 'react';
import {  Box, IconExternal, Split } from '@aragon/ui';
import VoteTable from './VoteTable';
import MemberTable from './MemberTable';

class Votes extends Component {
  constructor(props) {
      super(props);
      //the smart contract for the voting for the main research dao is specified below
       this.state = {
            voteId: "0xc6c1725868210736c3bcb784b4c13c6412823096",
            columns: ['Description','Link']
       };
   }


render() {

      return (
          <div>
            <h1 className="sectionTitle"> Votes </h1>
            <p className="sectionSubTitle"> passed by the Non-Profit/DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/research">'Research Collective' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>

            <Split
             primary={
               <div>
                <MemberTable/>
                <VoteTable box={this.props.box} columns={this.state.columns} voteId={this.state.voteId} address={this.props.address}/>
               </div>
                     }
             secondary={
               <>
                 <Box>
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
