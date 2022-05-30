import React, { Component } from 'react';
import { Tabs } from 'antd';

import './App.css';
import MovieList from '../movies-list';
import MovieListRated from '../movie-list-rated';

const { TabPane } = Tabs;

export default class App extends Component {
  state = { ratedMovieCounter: 0 };

  onPersonRateCounter = () => {
    this.setState(() => {
      const ratedMovieCounter = this.state.ratedMovieCounter + 1;
      return { ratedMovieCounter: ratedMovieCounter };
    });
  };

  render = () => {
    return (
      <div className="app">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="Search">
            <MovieList onPersonRateCounter={this.onPersonRateCounter} />
          </TabPane>
          <TabPane tab="Rated" key="Rated">
            <MovieListRated ratedMovieCounter={this.state.ratedMovieCounter} />
          </TabPane>
        </Tabs>
      </div>
    );
  };
}
