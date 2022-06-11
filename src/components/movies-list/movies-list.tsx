import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';

import Movie from '../movie';
import ListPagination from '../pagination';
import './movies-list.css';
import Service from '../../servises/servise';
import ServiceLocalStorage from '../../servises/servises-local-storage';
import { GenresConsumer } from '../moviedb-service-context/moviedb-service-context';
import SearchMovie from '../movie-search';
interface Props {
  onPersonRateCounter: () => void;
}

export default class MovieList extends Component<Props> {
  state = {
    movieList: [],
    loading: false,
    error: false,
    errorMessage: '',
    page: 1,
    firstLoading: true,
    searchValue: '',
    numberSearchPages: 1,
  };

  getResource = new Service();

  ServiceLocalStorage = new ServiceLocalStorage();

  componentDidUpdate(prevProps: {}, prevState: { page: number; searchValue: string }) {
    if (this.state.searchValue !== prevState.searchValue || this.state.page !== prevState.page) {
      this.renderMovieList(this.state.searchValue, this.state.page);
    }
  }

  getPageChange = (page: number): void => {
    this.setState(() => {
      return { page: page };
    });
  };

  addPersonalRating = (rate: number, id: number): void => {
    const idx: number = this.state.movieList.findIndex((el: { id: number }) => el.id === id);
    const selectedMovie: object = this.state.movieList[idx];
    const selectedMovieArr: object[] = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    selectedMovieArr.push({ ...selectedMovie, personRate: rate });
    this.ServiceLocalStorage.setLocalStorageMovie('selectedMovies', selectedMovieArr);
    this.props.onPersonRateCounter();
  };

  getSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  searchValue = debounce(this.getSearchChange, 1000);

  renderMovie = (elem: any): any => {
    const localStorageMovie: any = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    const movieIndexLocalStorage = localStorageMovie.findIndex((item: any) => elem.id === item.id);
    const personRate = movieIndexLocalStorage > -1 ? localStorageMovie[movieIndexLocalStorage].personRate : 0;
    return (
      <GenresConsumer>
        {(allGenres) => {
          const genres = this.getMovieGenres(elem, allGenres);
          return (
            <Movie
              key={elem.id}
              id={elem.id}
              title={elem.title}
              getMovieGenres={genres}
              releaseDate={elem.release_date}
              description={elem.overview}
              posterLink={elem.poster_path}
              voteAverage={elem.vote_average}
              addPersonalRating={this.addPersonalRating}
              personRate={personRate}
            />
          );
        }}
      </GenresConsumer>
    );
  };

  getMovieGenres = ({ genre_ids: genreIds }: { genre_ids: Number[] }, genres: any): any => {
    return genreIds.map((genreId) => {
      const genresIndex = genres.findIndex((genre: any) => {
        return genre.id === genreId;
      });
      return genres[genresIndex];
    });
  };

  async renderMovieList(searchValue: string, pageNumber: number = 1) {
    if (!searchValue) return;
    try {
      this.setState(() => {
        return { loading: true };
      });
      const resource = await this.getResource.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US&query=${searchValue}&page=${pageNumber}&include_adult=false`
      );
      this.setState(() => {
        return {
          loading: false,
          firstLoading: false,
          error: false,
          movieList: resource.results,
          numberSearchPages: resource.total_pages,
        };
      });
    } catch (e: any) {
      const errorMessage =
        e.message === 'Failed to fetch'
          ? 'no connection to the server, please check your internet connection'
          : e.message;
      console.log(e);
      this.setState({
        loading: false,
        error: true,
        errorMessage: errorMessage,
      });
    }
  }

  render = () => {
    if (!this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies'))
      this.ServiceLocalStorage.setLocalStorageMovie('selectedMovies', []);
    const noResultSearch =
      this.state.movieList.length === 0 && !this.state.loading && !this.state.error ? (
        this.state.firstLoading ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <h1 className="movies-list__title">let's find a movie</h1>
        ) : (
          <h1 className="movies-list__title">found nothing, please try again</h1>
        )
      ) : null;

    const pagination =
      this.state.movieList.length !== 0 && !this.state.loading && !this.state.error ? (
        <div className="movie-list__pagination">
          <ListPagination getPageChange={this.getPageChange} numberSearchPages={this.state.numberSearchPages} />
        </div>
      ) : null;

    const loadingSpin = this.state.loading && !this.state.error ? <Spin className="spin" size="large" /> : null;
    const errAlert = this.state.error ? (
      <Alert className="error-alert" message={this.state.errorMessage} type="error" />
    ) : null;
    const movieList = !this.state.loading && !this.state.error ? [...this.state.movieList].map(this.renderMovie) : null;
    return (
      <div className="movie-list">
        <SearchMovie getSearchChange={this.searchValue} />
        {noResultSearch}
        {movieList}
        {loadingSpin}
        {errAlert}
        {pagination}
      </div>
    );
  };
}
