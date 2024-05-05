import { useEffect, useState } from 'react';
import './Search.css';

export function Search({ searchMovies }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');

  const handleUpdate = (event) => {
    if (event.key === 'Enter') {
      searchMovies(search);
    }
  };

  const handleType = (searchType) => {
    setType(searchType);
  };

  useEffect(() => {
    searchMovies(search, type)
  }, [type]);

    return (
      <div className="row">
        <div className="col s12">
          <input
            className="validate"
            placeholder="Search here ..."
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyUp={handleUpdate}
          />
        </div>
        <a
          href="#"
          className="waves-effect waves-light btn"
          onClick={searchMovies(search, type)}
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
              onChange={() => handleType('all')}
            />
            <span>All</span>
          </label>
          <label>
            <input
              className="with-gap"
              name={type}
              type="radio"
              checked={type === 'movie'}
              onChange={() => handleType('movie')}
            />
            <span>Movies</span>
          </label>
          <label>
            <input
              className="with-gap"
              name={type}
              type="radio"
              checked={type === 'series'}
              onChange={() => handleType('series')}
            />
            <span>Serials</span>
          </label>
        </div>
      </div>
    );
}
