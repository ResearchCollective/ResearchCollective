import { Box as AragonBox, Button, DataView, IconMaximize, Modal } from '@aragon/ui';
import React, { Component } from 'react';

import NotebookForm from './NotebookForm';

class Notebook extends Component {
  constructor(props) {
      super(props);
       this.state = {
            client: false,
            view: false,
            spaceData: [],
            notes: [],
            singleChecked: false,
            opened: false,
            privateNotes: [],
            publicNotes: [],
            space: false
       };
   }

   loadNotes = async (e) => {
     console.log("Load notes");
        try {
              console.log("Tryna load the notes");
              const publicSpace = await this.props.space.public.all();
              console.log("Note loading success:" + publicSpace );
              var notes = pullNotesFrom(publicSpace);
              console.log("Note pulling success:" + notes);
              this.setState({notes: pullNotesFrom(publicSpace)});
              console.log(notes.entries);
        }
        catch(err) {
              console("note load fail ");
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
          <h1 className="sectionTitle"><i>Notebook</i></h1>
          <p className="sectionSubTitle"><i>Stash your research notes here on the interplanetary file system. They can either be public or encrypted with your MetaMask key.</i></p><br/>
            <div className="buttonContainer fullWidth flexContainer">
              <Button style={{maxWidth: "45px"}} label="Load Notes" size="medium" mode="neutral" onClick={(e) => this.loadNotes(e) } />
              <Button label="New Note" size="medium" mode="strong" onClick={() => this.setState({opened: true }) } />
               <Modal visible={this.state.opened} onClose={this.closeModal}>
                <NotebookForm    space={this.props.space} notes={this.state.notes}/>
              </Modal>
          </div>
        <AragonBox>
            <DataView style={{position: "absolute", top: "500px"}}
              fields={['id', 'title', 'description', 'labels']}
               entries={this.state.notes}
              renderEntry={({ id, title, description, labels }) => {
                return [<p>{id}</p>, <p>{title}</p>,<p>{description}</p>,<div  className="buttonContainer txnButton"> <Button label={labels} icon={<IconMaximize/>}/>  </div>]
              }}
            />
        </AragonBox>
      </div>
    )
  }
}

function pullNotesFrom(space) {
    var newData = [];
    if (space !== null) {
      try {
        console.log("Space is not null...");
        for (const item in space) {
            if (typeof item === 'string' || item instanceof String) {
               if (item.includes("note-")) {
                console.log("Note Item" + space[item]);
                try {
                  var newNote = {};
                  var note = space[item];
                  console.log("Note: ")
                  console.log(note);
                  var obj = JSON.parse(note);
                  newNote.id = item;
                  newNote.title = obj.title;
                  newNote.description = obj.description;
                  if (obj.label !== null) {
                  newNote.label = obj.label;
                } else {
                  newNote.label = "";
                }
                  newData[newData.length] = newNote;
              } catch(err) {
                 console.log("Error parsing JSON from Note " + space[item]);
              }
            }
          }
        }
      }
      catch(err) {
        console.log("pullNotes fail");
      }
    }
    (console.log("Final notes: " + newData));
  return newData;
}



export default Notebook;
