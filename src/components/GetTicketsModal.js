import React from 'react';

import Modal from './Modal';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';

class GetTicketsModal extends React.Component {
  
  state = {
    loading: false,
    error: null,
    form: {
      name: '',
      id_type: '',
      id_number: '',
      country: '',
      country_code: '',
      phone: '',
      email: '',
      amount: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  getTickets = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 1|mml3eWNjyYEYSY8tf14tQJZMNuPj1JtTCM9NDnoo");
    var formdata = new FormData();
    formdata.append("id_type", this.state.form.id_type);
    formdata.append("id_number", this.state.form.id_number);
    formdata.append("country", this.state.form.country);
    formdata.append("country_code", this.state.form.country_code);
    formdata.append("phone", this.state.form.phone);
    formdata.append("email", this.state.form.email);
    formdata.append("amount", this.state.form.amount);
    formdata.append("event_id", this.props.event_id);
    formdata.append("name", this.state.form.name);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    this.setState({ loading: true, error: null });

    try {
      fetch("http://ticket-api.oo/api/tickets/post", requestOptions)
      .then(async res => {
          const answer = await res.json();
          if (answer.status_code === 201){
            this.setState({ loading: false });
          }else{
            this.setState({ loading: false, error: answer.message });
          }
          this.props.onClose()
      })
      .catch((err) => {
          this.setState({ loading: false, error: err.message });
          console.log(err);
          throw err;                    
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render(){
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }
  return (
    <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
      <div className="GetTicketsModal">
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="name"
              value={this.state.form.name}
            />
          </div>

          <div className="form-group">
            <label>Identification Type (Like DNI)</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="id_type"
              value={this.state.form.id_type}
            />
          </div>

          <div className="form-group">
            <label>Identification Number</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="number"
              name="id_number"
              value={this.state.form.id_number}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="country"
              value={this.state.form.country}
            />
          </div>

          <div className="form-group">
            <label>Country Code (Like +57)</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="country_code"
              value={this.state.form.country_code}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="number"
              name="phone"
              value={this.state.form.phone}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="email"
              name="email"
              value={this.state.form.email}
            />
          </div>

          <div className="form-group">
            <label>How many tickets?</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="number"
              name="amount"
              min="0"
              value={this.state.form.amount}
            />
          </div>

          {this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )}
        </form>
        <div>
          <button onClick={this.getTickets} className="btn btn-primary mr-4">
            Get Now!
          </button>
          <button onClick={this.props.onClose} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
}

export default GetTicketsModal;
