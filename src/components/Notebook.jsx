import React, { Component } from 'react';
import { Button, TextInput, SidePanel, Box as AragonBox, IconMaximize, DataView } from '@aragon/ui';

class Notebook extends Component {
  constructor(props) {
      super(props);
       this.state = {
            client: false,
            view: false,
            singleChecked: false,
            opened: false,
            setOpened: false,
            privateNotes: [],
            publicNotes: []
       };
   }

   componentDidUpdate(){
     if(this.props.space && (!this.state.privateNotes || !this.state.publicNotes)){
            //TODO: Make sure this actually is called ... right now I think the conditions after && are not right
            // they will need to be updated once we figure out the right way to declare privateNotes & publicNotes
       this.getPublicNotes();
       this.getPrivateNotes();
     }
   }

   publicSave = async () => {
     //saves to a public 3Box space
    //TODO: Set this to save the note title + content
     await this.props.space.public.set("foo", "bar");
     this.setState({publicNoteToSave : null});
     console.log("public save: " + this.publicNoteToSave);
     this.getPublicNotes();
      this.setState({opened: false })
   }

  privateSave = async () => {
     //saves to a private 3Box space
     //await this.props.space.private.set("Date.now()", this.state.privateNoteToSave);
     // set(noteTitle, noteContent)
     //TODO: Set this to save the note title + content
     await this.props.space.private.set("foo2", "bar2");
     this.setState({privateNoteToSave : null});
     console.log("private save: " + this.privateNoteToSave);
     this.getPrivateNotes();
     this.setState({opened: false })
   }


   getPublicNotes = async (e) => {
       //TODO add in Catch or try or conditional so that it doesn't try to load from an empty space
       const publicNotes = await this.props.space.public.all();
       this.setState({ publicNotes });
       console.log("public load: " + this.publicNotes);
     }

     getPrivateNotes = async (e) => {
       //TODO add in Catch or try or conditional so that it doesn't try to load from an empty space
       const privateNotes = await this.props.space.private.all();
       this.setState({ privateNotes });
       console.log("private load: " + this.privateNotes);
     }


   alertPrivateNote  = async (e) => {
     const note = await this.props.space.private.get('foo2');
      alert(note);
   }


   alertPublicNote  = async (e) => {
     const note = await this.props.space.private.get('foo');
      alert(note);
   }




render() {
    return (
      <div>
          <h1 className="sectionTitle pushUp"><i>Notebook</i></h1>
          <h1 className="sectionSubTitle pushUp"><i>🚨Under Construction🚨</i></h1>
          <p className="pushUp sectionSubTitle"><i>Researchers will be able to stash public or encrypted notes on IPFS here.</i><br/><i>Eventually they will be able to log experimental data,<br/> or wrap their potentially patentable idea in a Series LLC for a few DAI.</i></p><br/>
          <SidePanel className="fullWidth" title={<TextInput className="fullWidth" placeholder="Note Title"/> } opened={this.state.opened}>
            //TODO:
             <TextInput className="fullWidth" placeholder="Comma, Separated, Labels" wide="true"  ></TextInput>
             <TextInput className="fullWidth" style={{minHeight: "300px"}} placeholder="Note" wide="true" multiline="true"/>
             <TextInput className="fullWidth" style={{minHeight: "120px"}} placeholder="Attachments" wide="true" multiline="true"/>
             <div className="buttonContainer">
              <Button style={{maxWidth: "45px"}} label="Save Private Note" size="medium" mode="strong" onClick={() => this.privateSave() }>
              </Button>
              <Button style={{maxWidth: "45px"}} label="Save Public Note" size="medium" mode="strong" onClick={() => this.publicSave() }>
              </Button>
              <Button  label="Discard" style={{marginLeft: "70px"}} size="medium" mode="negative" onClick={() => this.setState({opened: false }) }>
              </Button>
             </div>
          </SidePanel>
          <div className="fullWidth">
          //TODO: Remove these buttons; they are just for testing
               <Button label="Alert Public Note" size="medium" mode="strong" onClick={() => this.alertPublicNote() || null}>
               </Button>
               <Button label="Alert Private Note" size="medium" mode="strong" onClick={() => this.alertPrivateNote() || null}>
               </Button>
               <Button label="Get Private Notes" size="medium" mode="strong" onClick={() => this.getPrivateNotes() || null}>
               </Button>

                <Button label="New Note" size="medium" mode="strong" onClick={() => this.setState({opened: true }) }>
               </Button>
          </div>
        <AragonBox>
          <DataView style={{position: "absolute", top: "500px"}}
            fields={['Title', 'Labels', 'Date', 'Private']}
            //TODO: combine privateNotes & publicNotes. Include a boolean for isPrivate.
            entries={this.state.privateNotes}
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
