import React, {  Component } from 'react';
import ProfileHover from 'profile-hover';
import {Button, Modal, SidePanel, IconExternal, Box} from '@aragon/ui';
import EditProfile from '3box-profile-edit-react';
import MemberTable from './MemberTable';
import * as Constants from '../constants';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: [],
      space: [],
      opened: false,
      setOpened : false
     };
}

  render() {
      return (
         <div>
               <MemberTable network="rinkeby" appAddress={Constants.REVIEWBOARD_RINKEBY_TOKEN_APP} columns={Constants.COLUMNS_MEMBERS}/>
                <h1 className="sectionTitle pushUp"> Profile </h1>
                <p className="sectionSubTitle pushUp"> Your Ethereal Appearance</p>
                {this.props.address  && <h6>Address Online</h6>}
                {this.props.box  && <h6>Box Online</h6>}
                {this.props.space  && <h6>Space Online</h6>}
                <Box className="profileContainer">
                  {!this.props.address && <h1> Plz Install MetaMask Extension 😿 </h1>}
                  {this.props.address &&
                   <div className="pushUp">
                     <ProfileHover className="pushUp fatBottomed" address={this.props.address} showName={true} /><br/>
                   </div>
                 }
                 {this.props.space && this.props.box &&
                   <EditProfile
                           box={this.props.box}
                           space={this.props.space}
                           address={this.props.address}/>
                 }
                </Box>
              </div>
            )
          }
        }



export default Roster;
