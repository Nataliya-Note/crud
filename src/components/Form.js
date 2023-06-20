import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.form.text === '') {
      this.textRef.current.focus();
    }
  }

  render() {
    const {
      onSubmit: handleFormSubmit,
      onChange: handleInputChange,
      form,
    } = this.props;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmit(form);
        }}
      >
        <div className="form-control">
          <label htmlFor="text">New note</label>
          <textarea
            className="form-control__text"
            type="text"
            id="text"
            name="text"
            value={form.text}
            onChange={handleInputChange}
            ref={this.textRef}
            rows="3"
            autoComplete="off"
            required
          />
        </div>
        <button
          className="form-control__button-add"
          type="submit"
        >
          &#10148;
        </button>
      </form>
    );
  }
}

export default Form;