import { Box as AragonBox, Button, DataView, IconMaximize, SidePanel } from '@aragon/ui';
import React, { Component } from 'react';

import NotebookForm from './NotebookForm';

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
            publicNotes: [],
       };

      // TODO: need to get 'space' in App.js//
        
      // this to fetch data for table
      // Reasons(ComponentWillMount is depricated, and this works better than using this.componentDidMount)
      this.fetchNotes()
   }

    fetchNotes = async => {
      console.log('This is from fetchNotes method')
      if (this.props.space) {
        this.getPublicNotes()
        this.getPrivateNotes()
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
      console.log('this from getPublicNotes')
      const publicNotes = await this.props.space.public.all();
      this.setState({ publicNotes });
      console.log("public load: " + publicNotes);
    }

    getPrivateNotes = async (e) => {
      console.log('this from getPublicNotes')
      //TODO add in Catch or try or conditional so that it doesn't try to load from an empty space
      const privateNotes = await this.props.space.private.all();
      this.setState({ privateNotes });
      console.log("private load: " + privateNotes);
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
          <SidePanel className="fullWidth">
            {/* //TODO: */}
             <NotebookForm />
          </SidePanel>
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
