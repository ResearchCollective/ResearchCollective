import { Button, TextInput, LoadingRing } from '@aragon/ui';
import React, {Component } from 'react';

class NotebookForm extends Component {
  constructor(props) {
      super(props);
       this.state = {
            space: false,
            description: false,
       };
   }

   handleFormChange= (e) => {
         /*
           Because we named the inputs to match their
           corresponding values in state, it's
           super easy to update the state
         */

         this.setState({ [e.target.name]: e.target.value });

   }


   saveNote = async (e, isPrivate) => {
       console.log("Saving note");
        var date = new Date();
        var timestamp = date.getTime();
        var noteId = "note-"+timestamp;
        var newNote = {
            title: this.state.title,
            label: this.state.labels,
            description: this.state.description
        }
        var noteContent = JSON.stringify(newNote);
        console.log("Trying to create: " + noteId + noteContent);
        try {
              if (isPrivate) {
              await this.props.space.private.set(noteId, noteContent);
              console.log("Create private note success: " + noteId);
              } else {
              await this.props.space.public.set(noteId, noteContent);
              console.log("Create public note success: " + noteId);
              }
              this.props.closeModal();
        }
        catch(err) {
              alert("Create note failed ");
        }

    }

    render() {
        return (
        <div>
                <TextInput className="fullWidth" name='title'  onChange={this.handleFormChange}   placeholder="Note Title" wide="true" />
                 <TextInput className="fullWidth" name='labels'onChange={this.handleFormChange}   placeholder="Comma, Separated, Labels" wide="true" />
                 <TextInput className="fullWidth" name='description' onChange={this.handleFormChange}   style={{minHeight: "300px"}} placeholder="Note"  multiline={true} wide="true" />

                 {!this.props.space && <LoadingRing/>}
                 {this.props.space && <div className="buttonContainer">
                  <Button style={{maxWidth: "45px"}} label="Save Publicly" size="medium" mode="strong" onClick={(e) => this.saveNote(e, false) } />
                  <Button style={{maxWidth: "45px"}} label="Save Privately" size="medium" mode="negative" onClick={(e) => this.saveNote(e, true) } />
                </div>
              }
        </div>
    )
  }
}

export default NotebookForm;
