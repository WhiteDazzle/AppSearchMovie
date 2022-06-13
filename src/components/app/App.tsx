import React, { Component } from 'react';
import { Tabs } from 'antd';

import './App.css';
import MovieList from '../movies-list';
import MovieListRated from '../movie-list-rated';
import ServiceMovieDB from '../../servises/servise-movie-db';
import { GenresProvider } from '../moviedb-service-context/moviedb-service-context';
import Genre from '../../Data-types/genre';
const { TabPane } = Tabs;

type State = {
  ratedMovieCounter: number;
  allGenres: Array<Genre>;
};

export default class App extends Component {
  state: State = { ratedMovieCounter: 0, allGenres: [] };

  Service = new ServiceMovieDB();

  componentDidMount() {
    this.gettingArrayGenres();
  }

  async gettingArrayGenres() {
    const responseGenres = await this.Service.getGenresData();
    this.setState({ allGenres: responseGenres.genres });
  }

  onPersonRateCounter = () => {
    const ratedMovieCounter = this.state.ratedMovieCounter + 1;
    this.setState({ ratedMovieCounter: ratedMovieCounter });
  };

  render = () => {
    return (
      <div className="app">
        <GenresProvider value={this.state.allGenres}>
          <Tabs defaultActiveKey="Search" centered>
            <TabPane tab="Search" key="Search">
              <MovieList onPersonRateCounter={this.onPersonRateCounter} />
            </TabPane>
            <TabPane tab="Rated" key="Rated">
              <MovieListRated ratedMovieCounter={this.state.ratedMovieCounter} />
            </TabPane>
          </Tabs>
        </GenresProvider>
      </div>
    );
  };
}
