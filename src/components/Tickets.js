import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Tickets.css';
import Cover from './Cover';
//Listing tickets Acquired by customer
class TicketsItem extends React.Component {
  render() {
    return (
      <div className="TicketsItem">
        <Cover
          className="TicketsItem__avatar"
          url={this.props.ticket.event.cover_url}
        />

        <div>
          <strong>
            {this.props.ticket.event.artist} <br/> {this.props.ticket.event.location}
          </strong>
          <br />{this.props.ticket.event.event_date}
          <br />Number of entries: {this.props.ticket.amount}
          <br />Bought on: {this.props.ticket.date}
        </div>
      </div>
    );
  }
}


function Tickets(props) {
  const tickets = props.tickets;

  if (tickets.length === 0) {
    return (
      <div>
        <div className="form-group">
          <h2>Tickets</h2>
        </div>

        <h3>No tickets were found, get your own now!</h3>
      </div>
    );
  }

  return (
    <div className="Tickets">
      <div>
        <h2>Tickets</h2>
      </div>

      <ul className="list-unstyled">
        {tickets.map(ticket => {
          return (
            <li key={ticket.id}>
                <TicketsItem ticket={ticket} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tickets;
