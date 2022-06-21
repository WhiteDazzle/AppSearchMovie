import React, { Component } from 'react';
import { Alert, Spin } from 'antd';

import Movie from '../movie';
import MovieData from '../../Data-types/movie-data';
import ServiceMovieDB from '../../servises/servise-movie-db';
import errorMessage from '../../message/error-message';
import listMessage from '../../message/list-message';

import styles from './movie-list-rated.module.scss';
type Props = {
  ratedMovieCounter: number;
  guestSessionId: string;
};

type movieDbResponse = {
  page: number;
  results: Array<MovieData>;
  total_pages: number;
  total_results: number;
};

export default class MovieListRated extends Component<Props> {
  state = {
    personRated: [],
    loading: false,
    error: false,
    errMessage: '',
    page: 1,
    numberSelectedPages: 1,
  };

  serviceMovieDB = new ServiceMovieDB();

  componentDidMount() {
    this.getMovieListRated();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.ratedMovieCounter !== this.props.ratedMovieCounter) this.getMovieListRated();
  }

  renderMovie = (elem: MovieData): JSX.Element => {
    return (
      <Movie
        key={elem.id}
        id={elem.id}
        title={elem.title}
        releaseDate={elem.release_date}
        description={elem.overview}
        getMovieGenres={elem.genre_ids}
        posterLink={elem.poster_path}
        voteAverage={elem.vote_average}
        setPersonalRating={(a: number, b: number) => a + b}
        personRate={elem.rating}
      />
    );
  };

  async getMovieListRated() {
    try {
      this.setState({ loading: true });
      const resource: movieDbResponse = await this.serviceMovieDB.getPersonalRated(this.props.guestSessionId);
      const moviesList = resource.results;
      this.setState({
        loading: false,
        error: false,
        personRated: moviesList,
        numberSelectedPages: resource.total_pages,
      });
      return moviesList.map(this.renderMovie);
    } catch (e: any) {
      const errMessage = (e.message = !navigator.onLine ? errorMessage.noNetwork : e.message);
      console.log(e);
      this.setState({
        loading: false,
        error: true,
        errMessage: errMessage,
      });
    }
  }

  renderListMessage = (status: boolean): JSX.Element | null => {
    return this.state.personRated.length === 0 && status ? (
      <h1 className={styles.title}>{listMessage.noMoviesSelected}</h1>
    ) : null;
  };

  render = () => {
    const { loading, error, errMessage, personRated } = this.state;
    const noLoadingAndError = !loading && !error;
    const noMoviesSelected = this.renderListMessage(noLoadingAndError);
    const loadingSpin = loading && !error ? <Spin className={styles.spin} size="large" /> : null;
    const errAlert = error ? <Alert className={styles['error-alert']} message={errMessage} type="error" /> : null;
    const movieList = noLoadingAndError ? [...personRated].map(this.renderMovie) : null;
    return (
      <div className={styles['movie-list-rated']}>
        {movieList}
        {loadingSpin}
        {errAlert}
        {noMoviesSelected}
      </div>
    );
  };
}
