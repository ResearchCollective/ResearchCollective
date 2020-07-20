import { Button, Modal } from '@material-ui/core';
import React, { useState } from 'react';

import LoginModalContent from './LoginModalContent';

const LoginModal = () => {
    //  const loginWithMagic = ()  => {
    //       console.log('Attempting to login via magic');
    //       let fm = new Fortmatic('pk_test_FDABC9E0FE176C29');
    //       let web3 = new Web3(fm.getProvider());
    //       fm.user.login().then(() => {
    //           web3.eth.getAccounts((error, accounts) => {
    //               let myAccount = accounts.toString();
    //               console.log('Magic accounts',myAccount);
    //               this.setState({ethAddress: myAccount});
    //               console.log('Magic state:', this.state);
    //           }).then(console.log); // ['0x...']
    //       });
    //   }
    // ---------------------------------------------------------//
    // state for modal//
    const [open, setOpen] = useState(false)

    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    return (
        <React.Fragment>
            {/* button to trigger modal */}
            <Button 
              className='login-button'
              onClick={handleOpen}
            >
            Login
            </Button>
            {/* actual modal for login options */}
            <Modal
              open={open}
              onClose={handleClose}
              className='login-modal'
              aria-labelledby='login-modal'
            >
              <LoginModalContent />
            </Modal>
        </React.Fragment>
      )
}

export default LoginModal
