import { Button, TextInput } from '@aragon/ui';
import React, { useState } from 'react';

const NotebookForm = (props) => {

    // this is for state on inputs//
    let [note, setNote] = useState({
        title: '',
        labels: '',
        description: '',
        attachment: ''
    })
    // let [title, setTitle] = useState('')
    // let [labels, setLabel] = useState('')
    // let [note, setNote] = useState('')
    // let [attachment, setAttachment] = useState('')

    let handleOnChange = (e) => {
        let {name, value} = e.target
        setNote(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    let saveNote = async (e) => {
        let newNote = {
            id: 'dsfsdfs',
            title: note.title,
            label: note.labels,
            description: note.description
        }
        let notesSpace = this.props.space

        let notes = this.props.notes
        notes.push(newNote)
        
        console.log('notes', notes)
    }
    return(
        <div>
            <TextInput className="fullWidth" name='title' value={note.title} onChange={e => handleOnChange(e)} placeholder="Note Title" wide="true" /> 
            <TextInput className="fullWidth" name='labels' value={note.label} onChange={e => handleOnChange(e)} placeholder="Comma, Separated, Labels" wide="true" />
            <TextInput className="fullWidth" name='description' value={note.description} onChange={e => handleOnChange(e)} style={{minHeight: "300px"}} placeholder="Note" wide="true" multiline="true"/>
            <TextInput className="fullWidth" name='attachment' value={note.attachment} onChange={e => handleOnChange(e)} style={{minHeight: "120px"}} placeholder="Attachments" wide="true" multiline="true"/>
            <div className="buttonContainer">
                <Button style={{maxWidth: "45px"}} label="Save Private Note" size="medium" mode="strong" onClick={() => this.privateSave() } />
                <Button style={{maxWidth: "45px"}} label="Save Public Note" size="medium" mode="strong" onClick={(e) => saveNote(e) } />
            </div>
        </div>
    )
}

export default NotebookForm