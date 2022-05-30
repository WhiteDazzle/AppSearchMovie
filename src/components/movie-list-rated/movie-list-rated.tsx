import React, { Component } from 'react';

import './movie-list-rated.css';
import ServiceLocalStorage from '../../servises/servises-local-storage';
import Movie from '../movie';

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

  renderMovie = (elem: any): any => {
    const localStorageMovie = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    const movieIndexLocalStorage = localStorageMovie.findIndex((item: any) => elem.id === item.id);
    return movieIndexLocalStorage > -1 ? (
      <Movie
        key={elem.id}
        id={elem.id}
        title={elem.title}
        releaseDate={elem.release_date}
        description={elem.overview}
        posterLink={elem.poster_path}
        voteAverage={elem.vote_average}
        onPersonRate={(a: number, b: number) => a + b}
        personRate={elem.personRate}
      />
    ) : null;
  };

  render = () => {
    const movieListRatedArr = [...this.state.personRated];
    const movieListRated = movieListRatedArr.map(this.renderMovie);
    const noRated =
      movieListRatedArr.length === 0 ? <h1 className="movies-list-rated__title">You haven't rated any movies</h1> : null;
    return (
      <div className="movie-list-rated">
        {noRated} {movieListRated}
      </div>
    );
  };
}
