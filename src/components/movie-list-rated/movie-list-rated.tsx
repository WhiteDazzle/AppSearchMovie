import React, { Component } from 'react';

import './movie-list-rated.css';
import ServiceLocalStorage from '../../servises/servises-local-storage';
import Movie from '../movie';

export default class MovieListRated extends Component {
  state = { personRated: [] };

  ServiceLocalStorage = new ServiceLocalStorage();

  componentDidMount() {
    this.addRatedMovie();
  }

  addRatedMovie = (): void => {
    const movieListRated = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    this.setState(() => {
      return { personRated: movieListRated };
    });
  };

  doMovie = (elem: any): any => {
    return (
      <Movie
        key={elem.id}
        id={elem.id}
        title={elem.title}
        releaseDate={elem.release_date}
        description={elem.overview}
        posterLink={elem.poster_path}
        voteAverage={elem.vote_average}
        onPersonRate={(a: number, b: number) => a + b}
      />
    );
  };

  render = () => {
    const movieListRatedArr = [...this.state.personRated];
    const movieListRated = movieListRatedArr.map(this.doMovie);
    return <div className="movie-list-rated">{movieListRated}</div>;
  };
}
