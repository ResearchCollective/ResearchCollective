import React, {  Component } from 'react';
import {Button} from '@aragon/ui';

function Login(props){
  const {loginMagic, loginMetaMask} = props;

  return (
    <div>
      <h1> Login via..</h1>
      <Button onClick={loginMagic} label="Magic"/>
      <Button onClick={loginMetaMask} label="MetaMask" />
    </div>
  )
}

export default Login;
