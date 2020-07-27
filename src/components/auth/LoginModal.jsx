import { Button, Modal } from '@material-ui/core';
import React, { useState } from 'react';

import LoginModalContent from './LoginModalContent';

const LoginModal = (props) => {
    const {loginMagic, loginMetamask} = props
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
              <LoginModalContent loginMagic={loginMagic} loginMetamask={loginMetamask}/>
            </Modal>
        </React.Fragment>
      )
}

export default LoginModal
