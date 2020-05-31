import React, { Component } from 'react';
import {LoadingRing} from '@aragon/ui';

class Loading extends Component {
  render() {
    if(this.props.data.length === 0 || this.props.data === false) {
         return (
           <div height="100%" width="100%">
               <LoadingRing style={{width: "100%", height: "100%"}}/>
           </div>
         )} else {
           return (
             <React.Fragment/>
           )
         }
     }
  }

  export default Loading;
