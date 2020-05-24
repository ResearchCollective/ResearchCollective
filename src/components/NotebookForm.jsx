import { Button, TextInput } from '@aragon/ui';
import React from 'react';

const NotebookForm = () => {
    return(
        <div>
            <TextInput className="fullWidth" placeholder="Note Title" wide="true" /> 
            <TextInput className="fullWidth" placeholder="Comma, Separated, Labels" wide="true" />
            <TextInput className="fullWidth" style={{minHeight: "300px"}} placeholder="Note" wide="true" multiline="true"/>
            <TextInput className="fullWidth" style={{minHeight: "120px"}} placeholder="Attachments" wide="true" multiline="true"/>
            <div className="buttonContainer">
                <Button style={{maxWidth: "45px"}} label="Save Private Note" size="medium" mode="strong" onClick={() => this.privateSave() } />
                <Button style={{maxWidth: "45px"}} label="Save Public Note" size="medium" mode="strong" onClick={() => this.publicSave() } />
                <Button label="Discard" style={{marginLeft: "70px"}} size="medium" mode="negative" onClick={() => this.setState({opened: false }) } />
            </div>
        </div>
    )
}

export default NotebookForm