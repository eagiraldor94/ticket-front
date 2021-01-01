import React from 'react';

import './styles/Event.css';
import logo from '../images/event-header.svg';

/*Component for each event widget*/
class Event extends React.Component {
  render() {
    return (
      <div className="Event">
        <div className="Event__header">
          <img src={logo} alt="Company Logo" />
        </div>

        <div className="Event__section-name">
          <img
            className="Event__cover"
            src={this.props.cover_url}
            alt="Cover"
          />
          <h1>
            {this.props.artist} <br />
            <small>in</small> {this.props.location}
          </h1>
        </div>

        <div className="Event__section-info">
          <h3>$ {this.props.price}</h3>
          <div>{this.props.event_date}</div>
        </div>

        <div className="Event__footer">#clossevents</div>
      </div>
    );
  }
}

export default Event;
