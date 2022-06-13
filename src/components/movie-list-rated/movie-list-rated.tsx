import React, { Component } from 'react';

import './movie-list-rated.css';
import ServiceLocalStorage from '../../servises/servises-local-storage-movie';
import Movie from '../movie';
import { GenresConsumer } from '../moviedb-service-context/moviedb-service-context';
import Genre from '../../Data-types/genre';
import MovieData from '../../Data-types/movie-data';
interface Props {
  ratedMovieCounter: number;
}

export default class MovieListRated extends Component<Props> {
  state = { personRated: [] };

  ServiceLocalStorage = new ServiceLocalStorage();

  componentDidMount() {
    this.initiateMovie();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.ratedMovieCounter !== this.props.ratedMovieCounter) this.initiateMovie();
  }

  initiateMovie = (): void => {
    const movieListRated = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    this.setState(() => {
      return { personRated: movieListRated };
    });
  };

  renderMovie = (elem: MovieData): any => {
    const localStorageMovie = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    const movieIndexLocalStorage = localStorageMovie.findIndex((item: any) => elem.id === item.id);
    return movieIndexLocalStorage > -1 ? (
      <GenresConsumer>
        {(allGenres: {}) => {
          const genres = this.getMovieGenres(elem, allGenres);
          return (
            <Movie
              key={elem.id}
              id={elem.id}
              title={elem.title}
              releaseDate={elem.release_date}
              description={elem.overview}
              getMovieGenres={genres}
              posterLink={elem.poster_path}
              voteAverage={elem.vote_average}
              addPersonalRating={(a: number, b: number) => a + b}
              personRate={elem.personRate}
            />
          );
        }}
      </GenresConsumer>
    ) : null;
  };

  getMovieGenres = ({ genre_ids: genreIds }: { genre_ids: Number[] }, genres: any): Genre[] => {
    return genreIds.map((genreId) => {
      const genresIndex = genres.findIndex((genre: any) => {
        return genre.id === genreId;
      });
      return genres[genresIndex];
    });
  };

  render = () => {
    const movieListRatedArr = [...this.state.personRated];
    const movieListRated = movieListRatedArr.map(this.renderMovie);
    const noRated =
      movieListRatedArr.length === 0 ? (
        <h1 className="movies-list-rated__title">You haven&apos;t rated any movies</h1>
      ) : null;
    return (
      <div className="movie-list-rated">
        {noRated} {movieListRated}
      </div>
    );
  };
}
