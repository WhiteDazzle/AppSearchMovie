import React, { Component } from 'react';
import { debounce } from 'lodash';

import './App.css';
import MovieList from '../movies-list';
import SearchMovie from '../movie-search';

export default class App extends Component {
  state = { searchMovieName: '' };

  getSearchChange = (e: any) => {
    this.setState(() => {
      return { searchMovieName: e.target.value };
    });
    console.log(e.target.value);
  };

  searchValue = debounce(this.getSearchChange, 1000);

  render = () => {
    return (
      <div className="app">
        <SearchMovie getSearchChange={this.searchValue} />
        <MovieList searchValue={this.state.searchMovieName} />
      </div>
    );
  };
}
