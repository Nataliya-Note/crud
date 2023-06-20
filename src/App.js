import React from 'react';
import './App.css';
import Note from './components/Note';
import Form from './components/Form';
import initFetch from './initFetch';
const { get, post, del } = initFetch(process.env.REACT_APP_CURRENT_URL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      form: { text: '123' },
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    get('notes/')
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not load notes", error));
  }

  componentDidUpdate(_, prevState) {
    if (this.state.notes.length > prevState.notes.length) {
      window.scrollTo(0, window.outerHeight);
    }
  }

  handleFormChange({ target }) {
    const { name, value } = target;

    this.setState({form: { ...this.state.form, [name]: value }});
  }

  handleFormSubmit(form) {
    post('notes/', { text: form.text })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not upload the note", error));

    this.setState({ form: { text: '' } });
  }

  handleDeleteClick(id) {
    del(`notes/${id}`, { text: this.state.form.text })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not delete the note", error));
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <h1 className="title">Notes</h1>
          <div className="notes-container">
            {this.state.notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  onDeleteClick={() => this.handleDeleteClick(note.id)}
                />
              );
            })}
          </div>
          <Form
            onSubmit={this.handleFormSubmit}
            onChange={this.handleFormChange}
            form={this.state.form}
          />
        </div>
      </div>
    );
  }
}

export default App;