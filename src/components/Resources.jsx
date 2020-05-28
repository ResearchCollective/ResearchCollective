import React, { Component } from 'react';
import {Button, Box, Modal, DropDown, IconPlus, IconExternal, DataView, Field, TextInput} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';
import Registry from './Registry';

class Resources extends Component {
    //ID for covidresearch DAO's voting smart contract is specified below
    state = {
        box:false,
        address:false,
        voteId: "0x8f409307ecdd0cb567ae433a54ec9767ff585618"
    };



render() {
      return (
          <div>
            <h1 className="sectionTitle"> Resources </h1>
            <p className="sectionSubTitle"> passed by the expert DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'Covid Research' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
             <Box style={{display: "inline"}}>
               <Registry box={this.props.box} voteId={this.state.voteId} address={this.props.address}/>
            </Box>
          </div>
    );
  }
}


export default Resources;
