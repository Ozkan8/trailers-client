import React from 'react';

class ContactForm extends React.Component {

  render() {
    
    return <div className="row w-50 m-auto">
      <div className="col-md-12">
        <h4 className='w-100 pt-2 text-center'>{this.props.error}</h4>

        {this.props.request_movie_errors != null ? (
          <h6 className='w-100 pt-2 text-center text-danger'>Please check all required fields!</h6>
        ) : null}

        {this.props.showForm ? (
          <div>
            <input
              type="email"
              className="mt-2 form-control"
              placeholder="E-mail (Required)"
              required
              onChange={e => this.props.handleFormValues("email", e.target.value)}
            />
            <input
              type="text"
              className="mt-2 form-control"
              placeholder="Movie name (Required)"
              required
              onChange={e => this.props.handleFormValues("requested_movie_name", e.target.value)}
            />
            <textarea
              className="mt-2 form-control"
              placeholder="Message"
              onChange={e => this.props.handleFormValues("message", e.target.value)}></textarea>
            <button
              className="mt-2 btn btn-primary"
              onClick={this.props.handleRequestMovie}
            >Request movie</button>
          </div>
        ) : null}
      </div>
    </div>
  }
}
export default ContactForm;