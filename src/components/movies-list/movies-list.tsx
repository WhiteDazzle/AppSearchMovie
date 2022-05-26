import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import Movie from '../movie';
import ListPagination from '../pagination';
import './movies-list.css';
import Service from '../../servises/servise';

interface Props {
  searchValue: string;
}

export default class MovieList extends Component<Props> {
  state = { movieList: [], loading: false, error: false, page: 1 };

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.doMovieList(this.props.searchValue);
    }
  }

  getResource = new Service();

  getPageChange = (page: number) => {
    console.log(page);
    this.setState(() => {
      return { page: page };
    });
  };

  async doMovieList(searchValue: string) {
    if (!searchValue) return;

    this.setState(() => {
      return { loading: true };
    });
    try {
      const resource = await this.getResource.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US&query=${searchValue}&page=1&include_adult=false`
      );

      this.setState(() => {
        return {
          loading: false,
          movieList: resource.results.map((elem: any) => {
            return (
              <Movie
                key={elem.id}
                title={elem.title}
                releaseDate={elem.release_date}
                description={elem.overview}
                posterLink={elem.poster_path}
              />
            );
          }),
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
        // eslint-disable-next-line react/no-unescaped-entities
        <h1 className="movies-list__title">let's find a movie</h1>
      ) : null;
    const loadingSpin = this.state.loading && !this.state.error ? <Spin className="spin" size="large" /> : null;
    const errAlert = this.state.error ? <Alert message="проблемка" type="error" /> : null;
    const movieList = !this.state.loading ? this.state.movieList : null;
    return (
      <div className="movie-list">
        {noResultSearch}
        {movieList}
        {loadingSpin}
        {errAlert}
        <div className="movie-list__pagination">
          <ListPagination getPageChange={this.getPageChange} />
        </div>
      </div>
    );
  };
}
