import React, { Component } from 'react';
import { Button, TextInput, SidePanel, Box as AragonBox, IconMaximize, DataView } from '@aragon/ui';

class Notebook extends Component {
  constructor(props) {
      super(props);
       this.state = {
            client: false,
            voteData: null,
            view: false,
            singleChecked: false,
            opened: false,
            setOpened: false
       };
   }



   componentDidUpdate(){
     if(this.props.space && (!this.state.privateNotes || !this.state.publicNotes)){
       this.getPublicNotes();
       this.getPrivateNotes();
     }
   }

   publicSave = async (e) => {
     e.preventDefault();
     //saves to a public 3Box space
     await this.props.space.public.set(Date.now(), this.state.publicNoteToSave);

     this.setState({publicNoteToSave : null});
     console.log("public save: " + this.publicNoteToSave);
     this.getPublicNotes();
   }

   privateSave = async (e) => {
     e.preventDefault();

     //saves to a private 3Box space
     await this.props.space.private.set(Date.now(), this.state.privateNoteToSave);

     this.setState({privateNoteToSave : null});
     console.log("private save: " + this.privateNoteToSave);
     this.getPrivateNotes();
   }


   getPublicNotes = async () => {
       const publicNotes = await this.props.space.public.all();
       this.setState({ publicNotes });
      console.log("public load: " + this.publicNotes);
     }

     getPrivateNotes = async () => {
       const privateNotes = await this.props.space.private.all();
       this.setState({ privateNotes });
       console.log("private load: " + this.privateNotes);
     }




render() {
    return (
      <div>
          <h1 className="sectionTitle pushUp"><i>Notebook</i></h1>
          <h1 className="sectionSubTitle pushUp"><i>🚨Under Construction🚨</i></h1>
          <p className="pushUp sectionSubTitle"><i>Researchers will be able to stash public or encrypted notes on IPFS here.</i><br/><i>Eventually they will be able to log experimental data,<br/> or wrap their potentially patentable idea in a Series LLC for a few DAI.</i></p><br/>
          <SidePanel className="fullWidth" title={<TextInput className="fullWidth" placeholder="Note Title"/> } opened={this.state.opened}>
             <TextInput className="fullWidth" placeholder="Comma, Separated, Labels" wide="true"  ></TextInput>
             <TextInput className="fullWidth" style={{minHeight: "300px"}} placeholder="Note" wide="true" multiline="true"/>
             <TextInput className="fullWidth" style={{minHeight: "120px"}} placeholder="Attachments" wide="true" multiline="true"/>
             <div className="buttonContainer">
              <Button style={{maxWidth: "45px"}} label="Save Note" size="medium" mode="strong" onClick={() => this.setState({opened: false }) }>
              </Button>          <Button  label="Discard" style={{marginLeft: "70px"}} size="medium" mode="negative" onClick={() => this.setState({opened: false }) }>
                       </Button>
             </div>
          </SidePanel>
          <div className="fullWidth">
            <Button className="noteButton" label="New Note" size="medium" mode="strong" onClick={() => this.setState({opened: true }) }>
            </Button>
          </div>
        <AragonBox>

          <DataView style={{position: "absolute", top: "500px"}}
            fields={['Title', 'Labels', 'Date', 'Read']}
            entries={[
              { account: 'Test Note Title', amount: 'Public, Test', date: '1/2/2020',noteId: '' },
              { account: 'Feelings from 6-APB', amount: 'Private, Exp.1.3', date: '5/2/2020', noteId:''},
              { account: 'Ten Reasons Why I Never Humble Brag', amount: 'Public, Journal',date: '5/5/2020',noteId: '' },
            ]}
            renderEntry={({ account, amount, date, noteId }) => {
              return [<p>{account}</p>, <p>{amount}</p>,<p>{date}</p>,<div  className="buttonContainer txnButton"> <Button label={noteId} icon={<IconMaximize/>}/>  </div>]
            }}
          />


      </AragonBox>
      </div>
    )
  }
}



export default Notebook;
