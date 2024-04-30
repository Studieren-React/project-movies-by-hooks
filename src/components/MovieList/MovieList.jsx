import { Movie } from '../Movie/Movie';
import './MovieList.css';

export function MovieList({ movies }) {
  return (
    <div className="Movies">
      {movies.length ? (
        movies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} {...movie} />
        ))
      ) : (
        <h3 className="MoviesNothingFound">Nothing found</h3>
      )}
    </div>
  );
}
