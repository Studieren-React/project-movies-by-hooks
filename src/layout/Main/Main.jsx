import { useEffect, useState } from 'react';
import './Main.css';

import { MovieList } from '../../components/MovieList/MovieList';
import { Preloader } from '../../components/Preloader/Preloader';
import { Search } from '../../components/Search/Search';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_API_KEY;

export function Main() {
  const [movies, setMovies] = useState([]);
  const [busy, setBusy] = useState(false);

  /**
   * Получение списка фильмов
   * @param {String} search Ключевое слово, по которому выполняется поиск
   * @param {String} type Тип поиска - фильм или сериал
   * @returns
   */
  const fetchMovies = async (search, type) => {
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
  const updateState = (search= 'spring', type= '') => {
    setBusy(true);

    fetchMovies(search, type).then((movies) => {
      const response = movies != null ? movies : [];
      setMovies(response);
    }).finally(
      () => setBusy(false)
    );
  };

  /**
   * Поиск фильма по ключевому слову
   * @param {String} search Ключевое слово, по которому выполняется поиск
   * @param {String} type Тип поиска - фильм или сериал
   * @returns
   */
  const searchMovies = (search, type) => {
    updateState(search, type);
  };


  useEffect(() => {
    updateState();
  }, []);

  return (
    <main className="container content">
      <Search searchMovies={searchMovies} />
      {busy ? (
        <Preloader />
      ) : (
        <MovieList movies={movies} />
      )}
    </main>
  );
}
