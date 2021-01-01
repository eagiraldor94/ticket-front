import React from 'react';

import './styles/EventDetails.css';
import Event from '../components/Event';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import GetTicketsModal from '../components/GetTicketsModal';

class EventDetails extends React.Component {
  state = {
    loading: true,
    error: null,
    answer: {
      data: {
          id: "",
          artist: "",
          location: "",
          price: "",
          cover_url: "",
          limit: "",
          assistants: "",
          event_date: "",
      }
    },
    id_token: "1|mml3eWNjyYEYSY8tf14tQJZMNuPj1JtTCM9NDnoo",
    modalIsOpen: false,
  };

componentDidMount() {
  this.fetchData();
}
// Catching event details by api
fetchData = async () => {
  this.setState({ loading: true, error: null });
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + this.state.id_token);
  var url = "http://ticket-api.oo/api/events/get/"+this.props.match.params.event_id;
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    fetch(url, requestOptions)
    .then(async res => {
        const answer = await res.json();
        if (answer.status_code === 200){
          this.setState({ loading: false, answer: answer });
          console.log(this.state)
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

handleOpenModal = e => {
  this.setState({ modalIsOpen: true });
};

handleCloseModal = e => {
  this.setState({ modalIsOpen: false });
};

render(){
  if (this.state.loading === true && !this.state.data) {
    return <PageLoading />;
  }

  if (this.state.error) {
    return <PageError error={this.state.error} />;
  }
  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col-8">
            <Event
              artist={this.state.answer.data[0].artist}
              location={this.state.answer.data[0].location}
              price={this.state.answer.data[0].price}
              cover_url={this.state.answer.data[0].cover_url}
              event_date={this.state.answer.data[0].event_date}
            />
          </div>
          <div className="col-4 text-center">
            <h2>Actions</h2>
            <div>
              <div>
                <button onClick={this.handleOpenModal} className="btn btn-primary">
                  Get Tickets Now!
                </button>
                <GetTicketsModal
                  isOpen={this.state.modalIsOpen}
                  onClose={this.handleCloseModal}
                  event_id={this.props.match.params.event_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
export default EventDetails;
