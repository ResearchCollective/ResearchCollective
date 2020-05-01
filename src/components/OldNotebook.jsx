


class FormComponent extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>

        <Form.Group>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            type="text-area"
            as="textarea"
            placeholder="Note text"
            value={this.props.value || ""}
            onChange={this.props.onChange} />
          <Form.Text className="text-muted">
            {this.props.text}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
  }
}




state = {
  view: false
}



publicSave = async (e) => {
  e.preventDefault();
  //saves to a public 3Box space
  await this.props.space.public.set(Date.now(), this.state.publicNoteToSave);

  this.setState({publicNoteToSave : null});
  console.log("saved")
  this.getPublicNotes();
}

privateSave = async (e) => {
  e.preventDefault();

  //saves to a private 3Box space
  await this.props.space.private.set(Date.now(), this.state.privateNoteToSave);

  this.setState({privateNoteToSave : null});
  console.log("saved");
  this.getPrivateNotes();
}


getPublicNotes = async () => {
  const publicNotes = await this.props.space.public.all();
  this.setState({ publicNotes });
}

getPrivateNotes = async () => {
  const privateNotes = await this.props.space.private.all();
  this.setState({ privateNotes });
}

componentDidUpdate(){
  if(this.props.space && (!this.state.privateNotes || !this.state.publicNotes)){
    this.getPublicNotes();
    this.getPrivateNotes();
  }
}



            <Button onClick={() => (this.setState({ view: !this.state.view }))}> {this.state.view ? "Add" : "View"}</Button>
            {!this.state.view && this.props.space && (<>
              <h3>📖Public</h3>
              <FormComponent
                handleSubmit={this.publicSave}
                onChange={(e)=>(this.setState({publicNoteToSave : e.target.value}))}
                value={this.state.publicNoteToSave}
                label="Save a Public Note"
                text="This text will be saved publicly on 3Box"
              />
              <br />

              <h3>🗝Private</h3>
              <FormComponent
                handleSubmit={this.privateSave}
                onChange={(e)=>(this.setState({privateNoteToSave : e.target.value}))}
                value={this.state.privateNoteToSave}
                label="Save a Private Note"
                text="This text will be encrypted and saved with 3Box"
              />
            </>)}

            {this.state.view && <>
              <h2>View</h2>
              <br />
              <h3>📖Public</h3>
              {this.state.publicNotes &&  Object.values(this.state.publicNotes).map(note => <p>{note}</p>)}
              <br />
              <h3>🗝Private</h3>
              {this.state.privateNotes && Object.values(this.state.privateNotes).map(note => <p>{note}</p>)}
            </>}
