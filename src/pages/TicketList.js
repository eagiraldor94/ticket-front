import React from 'react';

import './styles/TicketList.css';
import './styles/Home.css';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Tickets from '../components/Tickets';

class TicketList extends React.Component {
  state = {
    loading: true,
    error: null,
    tickets: {
      data: [],
    },
    customer: {
      name:""
    },
    id_token: "1|mml3eWNjyYEYSY8tf14tQJZMNuPj1JtTCM9NDnoo"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    // Getting customer data
    this.setState({ loading: true, error: null });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.id_token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      fetch("http://ticket-api.oo/api/customers/get/"+this.props.match.params.document_number, requestOptions)
      .then(async res => {
          const answer = await res.json();
          if (answer.data.status_code === 200){
            this.setState({ loading: false, customer: answer.data });
          }else{
            this.setState({ loading: false, error: answer.data.message });
          }
      })
      .catch((err) => {
          console.log(err);
          throw err;                    
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
    //Getting tickets data
    this.setState({ loading: true, error: null });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.id_token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      fetch("http://ticket-api.oo/api/tickets/get/"+this.props.match.params.document_number, requestOptions)
      .then(async res => {
          const answer = await res.json();
          if (answer.status_code === 200){
            this.setState({ loading: false, tickets: answer });
          }else{
            this.setState({ loading: false, error: answer.message });
          }
      })
      .catch((err) => {
          console.log(err);
          throw err;                    
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="TicketList">
          <div className="TicketList__hero">
            <div className="container">
              <div className="row w-100 text-right">
                <div className="col-12 TicketList__hero-attendant-name">
                  <h1>
                    {this.state.customer.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="TicketList__container">
          <div className="row px-5">
            <div className="col-8">
              <Tickets tickets={this.state.tickets.data} />
            </div>
            <div className="col-4">
              <h2>My Information</h2>
              <ul className="list-unstyled">
                <li><strong>Identification Type:</strong> {this.state.customer.id_type}</li>
                <li><strong>Identification Number:</strong> {this.state.customer.id_number}</li>
                <li><strong>Country:</strong> {this.state.customer.country}</li>
                <li><strong>Full Phone:</strong> {this.state.customer.country_code} {this.state.customer.phone}</li>
                <li><strong>Email:</strong> {this.state.customer.email}</li>
              </ul>
              <small>Your data will update once you get new tickets!</small>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketList;
