import React from 'react';
import { Link } from 'react-router-dom';
//Search by customer document for tickets
class TicketsSearch extends React.Component {
    state = {
        document: "",
    }
    handleChange = e =>{
        this.setState({
            document: e.target.value,
        })
    }
  render() {
    return (
        <div className="row w-100">
            <div className="form-group col-8">
                <input
                    onChange={this.handleChange}
                    className="form-control"
                    type="number"
                    name="document"
                    value={this.state.document}
                />
            </div>
            <div className="form-group col-4">
                <Link to={"/tickets/"+this.state.document} className="btn btn-primary">
                    See your tickets
                </Link>
            </div>
        </div>
    );
  }
}

export default TicketsSearch;