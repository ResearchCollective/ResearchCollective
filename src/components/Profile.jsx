import React, { Component } from 'react';
import ProfileHover from 'profile-hover';
import {Button, Modal, Box} from '@aragon/ui';
import EditProfile from '3box-profile-edit-react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      box: [],
      space: []
     };
}

  render() {
      return (
         <div>
         <h1 className="sectionTitle pushUp"> Profile </h1>
         <p className="sectionSubTitle pushUp"> Your Ethereal Appearance</p>
            <Box className="profileContainer">
            {this.address && <div className="pushUp">
                <ProfileHover address={this.address} showName={true} />
                <EditProfileModal  box={this.box} space={this.space} address={this.address}/>
              </div>}
            </Box>
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
      <Button label="Edit Profile" onClick={open}/>
      <Modal visible={opened} onClose={close}>
         <p> Modal Content </p>
         <EditProfile
         />
      </Modal>
    </>
  )
}

export default Profile;
