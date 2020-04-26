import React, { Component } from 'react';
import Credentials from './Credentials';
import Web3Container from './Web3Container';
import ProfileHover from 'profile-hover';
import {Button, Modal} from '@aragon/ui';
import EditProfile from '3box-profile-edit-react';

class Profile extends Component {

  state = {
    web3enabled: false,
    box: false,
    space: false,
    address: false
  }

  render() {
      return (
         <div>
            <h3> Profile </h3>
            <Web3Container address={this.address} accounts={this.accounts} web3enabled={this.web3enabled}>
              <ProfileHover address={'0x262b4F07e42BBc33F597fcf0d854e9DAFaf3D469'} showName={true} />
                <p> Profile Sample Text </p>
              <EditProfileModal  box={this.box} space={this.space} address={this.address}/>
             <Credentials/>
            </Web3Container>
        </div>
    );
  }
}


function EditProfileModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)


  return (
    <>
      <Button onClick={open}>Edit Profile</Button>
      <Modal visible={opened} onClose={close}>
         <p> Modal Content </p>
         <EditProfile


         />
      </Modal>
    </>
  )
}




export default Profile;
