import { Box as AragonBox, Button, DataView, IconMaximize, Modal } from '@aragon/ui';
import React, {  Component } from 'react';
import NotebookForm from './NotebookForm';

class Notebook extends Component {
  constructor(props) {
      super(props);
       this.state = {
            client: false,
            view: false,
            spaceData: [],
            notes: [],
            opened: false,
            space: false
       };
   }

   componentDidMount() {
      this.loadNotes();
};

   loadNotes = async (e) => {
  //   console.log("Load notes");
        try {
              const publicSpace = await this.props.space.public.all();
              const privateSpace = await this.props.space.private.all();
        //      console.log("Note loading success:" + publicSpace + privateSpace );
              var privNotes = pullNotesFrom(privateSpace)
              var publicNotes = pullNotesFrom(publicSpace);
              var allNotes = privNotes.concat(publicNotes);
      //        console.log("Note pulling success:" + privNotes + publicNotes);
              this.setState({notes: allNotes});
        }
        catch(err) {
    //         console.log("note load fail");
        }
    }

    closeModal = () =>{
      this.setState({opened:false})
    }


render() {
    return (
      <div>
          <h1 className="sectionTitle"><i>Notebook</i></h1>
          <p className="sectionSubTitle sectionBreak"><i>Stash your research notes here on the interplanetary file system (IPFS). They can either be public or encrypted with your MetaMask key.</i></p><br/>
            <div className="buttonContainer fullWidth">
               <Button style={{maxWidth: "45px"}} label="Load Notes" size="medium" mode="normal" onClick={(e) => this.loadNotes(e) } />
               <Button label="New Note" size="medium" mode="strong" onClick={() => this.setState({opened: true }) } />
               <Modal visible={this.state.opened} onClose={this.closeModal}>
               <NotebookForm  closeModal={this.closeModal} space={this.props.space} notes={this.state.notes}/>
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
    //    console.log("Space is not null...");
        for (const item in space) {
            if (typeof item === 'string' || item instanceof String) {
               if (item.includes("note-")) {
        //        console.log("Note Item" + space[item]);
                try {
                  var newNote = {};
                  var note = space[item];
        //          console.log("Note: ")
        //          console.log(note);
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
      //           console.log("Error parsing JSON from Note " + space[item]);
              }
            }
          }
        }
      }
      catch(err) {
    //    console.log("pullNotes fail");
      }
    }
  //  (console.log("Final notes: " + newData));
  return newData;
}



export default Notebook;
