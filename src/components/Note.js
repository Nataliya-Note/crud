import React from 'react';

class Note extends React.Component {
  render() {
    return (
      <div className="note" id={this.props.id}>
        <p>{this.props.text}</p>
        <a
          href="#0"
          className="note__control-delete"
          onClick={this.props.onDeleteClick.bind(this)}
        >&times;
        </a>
      </div>
    );
  }
}

export default Note;