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


function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const [selected, setSelected] = React.useState()
  return (
    <>
      <Button className="pushDown" mode="outline"  icon={<IconPlus/>} onClick={open} label="Post Resource"/>
        <Modal visible={opened} onClose={close}>
             <Box className="notesContainer">
               <h1 className="sectionTitle"> Post Resource</h1>
               <Field label="Type">
                 <DropDown
                    items={['Vendor', 'Article', 'Registry', 'Experiment']}
                    selected={selected}
                    onChange={setSelected}
                  />
                </Field>
             <Field label="Name"><TextInput placeholder="Required" wide="true"></TextInput></Field>
             <Field  label="Description"><TextInput placeholder="Required" wide="true" multiline="true"></TextInput></Field>
             <Field label="URL or DOI"><TextInput placeholder="Optional" wide="true"></TextInput></Field>
             <Field label="Owner"><TextInput placeholder="EthAddress or Email; Optional" wide="true"></TextInput></Field>
             <Button mode="strong" label="Post"/>
          </Box>
      </Modal>
    </>
  )
}


export default Resources;
