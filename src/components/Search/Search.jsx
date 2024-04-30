import { Component } from 'react';
import './Search.css';

export class Search extends Component {
  state = {
    search: '',
    type: 'all',
  };

  handleUpdate = (event) => {
    if (event.key === 'Enter') {
      this.props.searchFn(this.state.search);
    }
  };

  handleType = (searchType) => {
    this.setState(
      () => ({ type: searchType }),
      () => {
        this.props.searchFn(this.state.search, this.state.type);
      },
    );
  };

  render() {
    const { search, type } = this.state;

    return (
      <div className="row">
        <div className="col s12">
          <input
            className="validate"
            placeholder="Search here ..."
            type="search"
            value={search}
            onChange={(event) => this.setState({ search: event.target.value })}
            onKeyUp={this.handleUpdate}
          />
        </div>
        <a
          href="!#"
          className="waves-effect waves-light btn"
          onClick={() => this.props.searchFn(search, type)}
        >
          search
        </a>
        <div className="SearchType">
          <label>
            <input
              className="with-gap"
              name={type}
              type="radio"
              checked={type === 'all'}
              onChange={() => this.handleType('all')}
            />
            <span>All</span>
          </label>
          <label>
            <input
              className="with-gap"
              name={type}
              type="radio"
              checked={type === 'movie'}
              onChange={() => this.handleType('movie')}
            />
            <span>Movies</span>
          </label>
          <label>
            <input
              className="with-gap"
              name={type}
              type="radio"
              checked={type === 'series'}
              onChange={() => this.handleType('series')}
            />
            <span>Serials</span>
          </label>
        </div>
      </div>
    );
  }
}
