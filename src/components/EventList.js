import React from 'react';
import { Link } from 'react-router-dom';

import './styles/EventList.css';
import Cover from './Cover';

class EventListItem extends React.Component {
  render() {
    return (
      <div className="EventListItem">
        <Cover
          className="EventListItem__avatar"
          url={this.props.event_info.cover_url}
        />

        <div>
          <strong>
            {this.props.event_info.artist} <small>in</small> {this.props.event_info.location}
          </strong>
          <br />$ {this.props.event_info.price}
          <br />
          {this.props.event_info.event_date}
        </div>
      </div>
    );
  }
}
//Filtering current events
function useSearchEvent(events) {
  const [query, setQuery] = React.useState('');
  const [filteredEvents, setFilteredEvents] = React.useState(events);

  React.useMemo(() => {
    const result = events.filter(event_info => {
      return `${event_info.artist} ${event_info.location}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredEvents(result);
  }, [events, query]);

  return { query, setQuery, filteredEvents };
}

function EventList(props) {
  const events = props.events;

  const { query, setQuery, filteredEvents } = useSearchEvent(events);

  if (filteredEvents.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Events</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <h3>No events were found</h3>
      </div>
    );
  }

  return (
    <div className="EventList">
      <div className="form-group">
        <label>Filter Events</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredEvents.map(event_info => {
          return (
            <li key={event_info.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/event/${event_info.id}`}
              >
                <EventListItem event_info={event_info} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EventList;
