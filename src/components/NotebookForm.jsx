import { Button, TextInput } from '@aragon/ui';
import React, {Component } from 'react';

class NotebookForm extends Component {
  constructor(props) {
      super(props);
       this.state = {
            space: false,
            note: false,
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

   savePrivateNote = async (e) => {
     alert("This function is in development");
}

   saveNote = async (e) => {
        var note;
        var date = new Date();
        var timestamp = date.getTime();
        var noteId = "note-"+timestamp;
        var newNote = {
            title: this.state.title,
            label: this.state.labels,
            description: this.state.description
        }
        var noteContent = JSON.stringify(newNote);;
        try {
              await this.props.space.public.set(noteId, noteContent);
              note = await this.props.space.public.get(noteId);
              console("Create note success: " + note);
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
                 <TextInput className="fullWidth" name='description' onChange={this.handleFormChange}   style={{minHeight: "300px"}} placeholder="Note" wide="true" multiline="true"/>
                 <TextInput className="fullWidth" name='attachment' placeholder="Does not work yet"  onChange={this.handleFormChange}   style={{minHeight: "120px"}} placeholder="Attachments" wide="true" multiline="true"/>
                <Button style={{maxWidth: "45px"}} label="Save Publicly" size="medium" classname="rc-button" onClick={(e) => this.saveNote(e) } />
                <Button style={{maxWidth: "45px"}} label="Save Privately" size="medium" mode="negative" onClick={(e) => this.savePrivateNote(e) } />
        </div>
    )
  }
}

export default NotebookForm;
