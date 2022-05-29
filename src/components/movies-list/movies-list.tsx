import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';

import Movie from '../movie';
import ListPagination from '../pagination';
import './movies-list.css';
import Service from '../../servises/servise';
import ServiceLocalStorage from '../../servises/servises-local-storage';
import SearchMovie from '../movie-search';

export default class MovieList extends Component {
  state = { movieList: [], loading: false, error: false, page: 1, firstLoading: true, searchValue: '' };

  getResource = new Service();

  ServiceLocalStorage = new ServiceLocalStorage();

  componentDidUpdate(prevProps: {}, prevState: { page: number; searchValue: string }) {
    if (this.state.searchValue !== prevState.searchValue || this.state.page !== prevState.page) {
      this.doMovieList(this.state.searchValue, this.state.page);
    }
  }

  getPageChange = (page: number): void => {
    this.setState(() => {
      return { page: page };
    });
  };

  onPersonRate = (rate: number, id: number): void => {
    if (!this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies'))
      this.ServiceLocalStorage.setLocalStorageMovie('selectedMovies', []);
    const idx: number = this.state.movieList.findIndex((el: { id: number }) => el.id === id);
    const selectedMovie: object = this.state.movieList[idx];
    const selectedMovieArr: object[] = this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies');
    selectedMovieArr.push({ ...selectedMovie, personRate: rate });
    this.ServiceLocalStorage.setLocalStorageMovie('selectedMovies', selectedMovieArr);
    console.log(this.ServiceLocalStorage.getLocalStorageMovie('selectedMovies'));
  };

  getSearchChange = (e: any) => {
    this.setState(() => {
      return { searchValue: e.target.value };
    });
    console.log(e.target.value);
  };

  searchValue = debounce(this.getSearchChange, 1000);

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
        onPersonRate={this.onPersonRate}
      />
    );
  };

  async doMovieList(searchValue: string, pageNumber: number = 1) {
    if (!searchValue) return;

    this.setState(() => {
      return { loading: true };
    });
    try {
      const resource = await this.getResource.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US&query=${searchValue}&page=${pageNumber}&include_adult=false`
      );

      this.setState(() => {
        return {
          loading: false,
          firstLoading: false,
          movieList: resource.results,
        };
      });
    } catch (e: any) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render = () => {
    const noResultSearch =
      this.state.movieList.length === 0 && !this.state.loading ? (
        this.state.firstLoading ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <h1 className="movies-list__title">let's find a movie</h1>
        ) : (
          <h1 className="movies-list__title">found nothing, please try again</h1>
        )
      ) : null;

    const pagination =
      this.state.movieList.length !== 0 ? (
        <div className="movie-list__pagination">
          <ListPagination getPageChange={this.getPageChange} />
        </div>
      ) : null;

    const loadingSpin = this.state.loading && !this.state.error ? <Spin className="spin" size="large" /> : null;
    const errAlert = this.state.error ? <Alert message="проблемка" type="error" /> : null;
    const movieList = !this.state.loading ? [...this.state.movieList].map(this.doMovie) : null;
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
