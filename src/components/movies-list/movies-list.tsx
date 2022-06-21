import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';

import Movie from '../movie';
import ListPagination from '../pagination';
import SearchMovie from '../movie-search';
import ServiceMovieDB from '../../servises/servise-movie-db';
import ServiceLocalStorageMovie from '../../servises/servises-local-storage-movie';
import MovieData from '../../Data-types/movie-data';
import errorMessage from '../../message/error-message';
import listMessage from '../../message/list-message';

import styles from './movies-list.module.scss';
interface Props {
  onPersonRateCounter: () => void;
  guestSessionId: string;
}

export default class MovieList extends Component<Props> {
  state = {
    movieList: [],
    loading: false,
    error: false,
    errMessage: '',
    page: 1,
    firstLoading: true,
    searchValue: '',
    numberSearchPages: 1,
  };

  serviceMovieDB = new ServiceMovieDB();

  serviceLocalStorage = new ServiceLocalStorageMovie();

  componentDidUpdate(prevProps: {}, prevState: { page: number; searchValue: string }) {
    if (this.state.searchValue !== prevState.searchValue || this.state.page !== prevState.page) {
      this.getMovieList(this.state.searchValue, this.state.page);
    }
  }

  handlePageChange = (page: number): void => {
    this.setState({ page: page });
  };

  setPersonalRating = (rate: number, id: number): void => {
    const idx: number = this.state.movieList.findIndex((el: { id: number }) => el.id === id);
    const selectedMovie: MovieData = this.state.movieList[idx];
    const selectedMovieArr: MovieData[] = this.serviceLocalStorage.getLocalStorageMovie('selectedMovies');
    if (selectedMovieArr.find((el: MovieData) => el.id === selectedMovie.id)) return;
    selectedMovieArr.push({ ...selectedMovie, personRate: rate });
    this.serviceLocalStorage.setLocalStorageMovie('selectedMovies', selectedMovieArr);
    this.serviceMovieDB
      .postMovieRated(id, rate, this.props.guestSessionId)
      .then(() => this.props.onPersonRateCounter());
  };

  handleSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  searchValue = debounce(this.handleSearchChange, 1000);

  renderMovie = (elem: MovieData): JSX.Element => {
    const localStorageMovie: MovieData[] = this.serviceLocalStorage.getLocalStorageMovie('selectedMovies');
    const movieIndexLocalStorage = localStorageMovie.findIndex((item: MovieData) => elem.id === item.id);
    const personRate = movieIndexLocalStorage > -1 ? localStorageMovie[movieIndexLocalStorage].personRate : 0;
    return (
      <Movie
        key={elem.id}
        id={elem.id}
        title={elem.title}
        getMovieGenres={elem.genre_ids}
        releaseDate={elem.release_date}
        description={elem.overview}
        posterLink={elem.poster_path}
        voteAverage={elem.vote_average}
        setPersonalRating={this.setPersonalRating}
        personRate={personRate}
      />
    );
  };

  renderListMessage = (status: boolean): JSX.Element | null => {
    return this.state.movieList.length === 0 && status ? (
      this.state.firstLoading ? (
        <h1 className={styles.title}>{listMessage.searchStartMessage}</h1>
      ) : (
        <h1 className={styles.title}>{listMessage.noSearchResult}</h1>
      )
    ) : null;
  };

  async getMovieList(searchValue: string, pageNumber: number = 1) {
    if (!searchValue.trim()) return;
    try {
      this.setState({ loading: true });
      const resource = await this.serviceMovieDB.getMovieData(searchValue, pageNumber);
      this.setState({
        loading: false,
        firstLoading: false,
        error: false,
        movieList: resource.results,
        numberSearchPages: resource.total_pages,
      });
    } catch (e: any) {
      const errMessage = !navigator.onLine ? errorMessage.noNetwork : e.message;
      console.log(e);
      this.setState({
        loading: false,
        error: true,
        errMessage: errMessage,
      });
    }
  }

  render = () => {
    const { loading, error, errMessage, movieList } = this.state;
    const noLoadingAndError = !loading && !error;
    if (!this.serviceLocalStorage.getLocalStorageMovie('selectedMovies'))
      this.serviceLocalStorage.setLocalStorageMovie('selectedMovies', []);
    const noResultSearch = this.renderListMessage(noLoadingAndError);
    const pagination =
      movieList.length !== 0 && noLoadingAndError ? (
        <div className={styles.pagination}>
          <ListPagination
            page={this.state.page}
            handlePageChange={this.handlePageChange}
            numberSearchPages={this.state.numberSearchPages}
          />
        </div>
      ) : null;

    const loadingSpin = loading && !error ? <Spin className={styles.spin} size="large" /> : null;
    const errAlert = error ? <Alert className={styles['error-alert']} message={errMessage} type="error" /> : null;
    const movieCardList = noLoadingAndError ? [...movieList].map(this.renderMovie) : null;
    return (
      <div className={styles['movie-list']}>
        <SearchMovie handleSearchChange={this.searchValue} />
        {noResultSearch}
        {movieCardList}
        {loadingSpin}
        {errAlert}
        {pagination}
      </div>
    );
  };
}
