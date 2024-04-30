import { Component } from 'react';
import './Main.css';

import { MovieList } from '../../components/MovieList/MovieList';
import { Preloader } from '../../components/Preloader/Preloader';
import { Search } from '../../components/Search/Search';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_API_KEY;

export class Main extends Component {
  state = {
    movies: [],
    busy: false,
  };

  /**
   * Получение списка фильмов
   * @param {String} search Ключевое слово, по которому выполняется поиск
   * @param {String} type Тип поиска - фильм или сериал
   * @returns
   */
  fetchMovies = async (search = 'spring', type = '') => {
    const searchQuery = search === '' ? 'spring' : search;
    const typeQuery = type === 'all' ? '' : type;
    const urlQuery = `${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}&type=${typeQuery}`;

    const response = await fetch(urlQuery);

    if (response.ok) {
      const movies = await response.json();
      return movies.Search;
    } else {
      alert(`HTTP error: ${response.status}`);
      return [];
    }
  };

  /**
   * Обновление стейта компонента
   * @param {String} search Ключевое слово, по которому выполняется поиск
   * @param {String} type Тип поиска - фильм или сериал
   * @returns
   */
  updateState = (search, type) => {
    this.setState({ busy: true });
    this.fetchMovies(search, type).then((movies) => {
      const response = movies != null ? movies : [];
      this.setState({ movies: response, busy: false });
    });
  };

  /**
   * Поиск фильма по ключевому слову
   * @param {String} search Ключевое слово, по которому выполняется поиск
   * @param {String} type Тип поиска - фильм или сериал
   * @returns
   */
  searchMovies = (search, type) => {
    this.updateState(search, type);
  };

  componentDidMount() {
    this.updateState();
  }

  render() {
    return (
      <main className="container content">
        <Search searchFn={this.searchMovies} />
        {this.state.busy ? (
          <Preloader />
        ) : (
          <MovieList movies={this.state.movies} />
        )}
      </main>
    );
  }
}
