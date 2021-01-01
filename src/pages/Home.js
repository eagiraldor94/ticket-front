import React from 'react';

import './styles/Home.css';
import EventList from '../components/EventList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import TicketsSearch from '../components/TicketsSearch';

class Home extends React.Component {
  state = {
    loading: true,
    error: null,
    answer: {
      data: [],
    },
    id_token: "1|mml3eWNjyYEYSY8tf14tQJZMNuPj1JtTCM9NDnoo"
  };

  componentDidMount() {
    this.fetchData();
  }
  // Catching all events by api
  fetchData = async () => {
    this.setState({ loading: true, error: null });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.id_token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      fetch("http://ticket-api.oo/api/events/get", requestOptions)
      .then(async res => {
          const answer = await res.json();
          if (answer.status_code === 200){
            this.setState({ loading: false, answer: answer });
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

        <div className="Home__container">
          <div className="Home__buttons">
            <TicketsSearch />
          </div>

          <EventList events={this.state.answer.data} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
