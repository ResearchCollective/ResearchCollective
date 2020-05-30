import Box from '3box';
import { Box as AragonBox, Button, DataView, IconMaximize, Modal } from '@aragon/ui';
import React, { Component } from 'react';

import NotebookForm from './NotebookForm';

class Notebook extends Component {
  constructor(props) {
      super(props);

      const accountAddress = this.props.accountAddress
      console.log(accountAddress)

       this.state = {
            client: false,
            view: false,
            notes: [],
            singleChecked: false,
            opened: false,
            privateNotes: [],
            publicNotes: [],
       };
      // opening notes space//
      this.get3BoxNotesSpace() 
      // this to fetch data for table
      // Reasons(ComponentWillMount is depricated, and this works better than using this.componentDidMount)
      this.fetchNotes()

   }

   get3BoxNotesSpace = async() => {
    if(this.props.accountAddress !== false){
      console.log('this is to get notes space')
      const provider = await Box.get3idConnectProvider()
      const box = await Box.create(provider)
      const notesSpace = ('Research-Collective-Notes')
      await box.auth(notesSpace, this.props.accountAddress )
      await notesSpace.syncDone()
      console.log('Opened notes space')
    // this.setState({notesSpace})
    // console.log(this.state.notesSpace)
    }else{
      console.warn('No account founds!!!')
    }
}


    fetchNotes = async => {
      console.log('This is from fetchNotes method')
      if (this.props.space) {
        this.getPublicNotes()
        this.getPrivateNotes()
      }
    }

    // publicSave = async () => {
    //   //saves to a public 3Box space
    //   //TODO: Set this to save the note title + content
    //   await this.props.space.public.set("foo", "bar");
    //   this.setState({publicNoteToSave : null});
    //   console.log("public save: " + this.publicNoteToSave);
    //   this.getPublicNotes();
    //   this.setState({opened: false })
    // }

    // privateSave = async () => {
    //  //saves to a private 3Box space
    //  //await this.props.space.private.set("Date.now()", this.state.privateNoteToSave);
    //  // set(noteTitle, noteContent)
    //  //TODO: Set this to save the note title + content
    //   await this.props.space.private.set("foo2", "bar2");
    //   this.setState({privateNoteToSave : null});
    //   console.log("private save: " + this.privateNoteToSave);
    //   this.getPrivateNotes();
    //   this.setState({opened: false })
    // }


    // getPublicNotes = async (e) => {
    //   //TODO add in Catch or try or conditional so that it doesn't try to load from an empty space
    //   console.log('this from getPublicNotes')
    //   const publicNotes = await this.props.space.public.all();
    //   this.setState({ publicNotes });
    //   console.log("public load: " + publicNotes);
    // }

    // getPrivateNotes = async (e) => {
    //   console.log('this from getPublicNotes')
    //   //TODO add in Catch or try or conditional so that it doesn't try to load from an empty space
    //   const privateNotes = await this.props.space.private.all();
    //   this.setState({ privateNotes });
    //   console.log("private load: " + privateNotes);
    // }

    closeModal = () =>{
      this.setState({opened:false})
    }


render() {
    return (
      <div>
          <h1 className="sectionTitle pushUp"><i>Notebook</i></h1>
          <h1 className="sectionSubTitle pushUp"><i>🚨Under Construction🚨</i></h1>
          <p className="pushUp sectionSubTitle"><i>Researchers will be able to stash public or encrypted notes on IPFS here.</i><br/><i>Eventually they will be able to log experimental data,<br/> or wrap their potentially patentable idea in a Series LLC for a few DAI.</i></p><br/>
          <Modal className="fullWidth" visible={this.state.opened} onClose={this.closeModal}>
            {/* //TODO: */}
            <NotebookForm accountAddress={this.props.accountAddress}/>
          </Modal>
          <div className="fullWidth">
            <Button label="New Note" size="medium" mode="strong" onClick={() => this.setState({opened: true }) } />
          </div>
        <AragonBox>
          <DataView style={{position: "absolute", top: "500px"}}
            fields={['Title', 'Labels', 'Date', 'Private']}
            //TODO: combine privateNotes & publicNotes. Include a boolean for isPrivate.

            // This id dummy data to verify that data view is working(for entries), Original logis is commented below//
            entries={[
              { account: 'dhfjdsfhsd', amount: '-7.900,33 ANT', date: '24 May 2020', noteId: '1' },
              { account: 'dhfjdsfhsd', amount: '-7.900,33 ANT', date: '24 May 2020', noteId: '1' },
              { account: 'dhfjdsfhsd', amount: '-7.900,33 ANT', date: '24 May 2020', noteId: '1' },
            ]}
            // entries={this.state.privateNotes}
            
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
