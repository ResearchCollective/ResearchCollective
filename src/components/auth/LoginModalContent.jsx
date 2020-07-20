import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

const LoginModalContent = () => {
    return(
        <div className='login-modal-content'>
            <h1>Start Exploring Now</h1>     
            <Grid container className='login-options'>
                {/* Login with magic*/}
                <Grid item xs={12} sm={6} md={6}>
                    <div className='login-option'>
                        <img src={process.env.PUBLIC_URL + '/magic-logo.png'} alt='magic-logo'/>
                        <Typography>Don't have a metamask or Ethereum address? Signup using your email</Typography>
                        <Button>Sign Up with Magic</Button>
                    </div>       
                </Grid>
                {/* login with metamask */}
                <Grid item xs={12} sm={6} md={6}>
                    <div className='login-option'>
                        <img src={process.env.PUBLIC_URL + '/metamask-logo.png'} alt='metamask-logo'/>
                        <Typography>Already have metamask extension setup ? Connect using Metamask</Typography>
                        <Button>Connect with Metamask</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginModalContent