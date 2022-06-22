import React, { Component } from 'react';
import { Tabs } from 'antd';

import MovieList from '../movies-list';
import MovieListRated from '../movie-list-rated';
import ServiceMovieDB from '../../servises/servise-movie-db';
import { GenresProvider } from '../moviedb-service-context/moviedb-service-context';
import Genre from '../../Data-types/genre';

import styles from './App.module.scss';
const { TabPane } = Tabs;

type State = {
  ratedMovieCounter: number;
  allGenres: Array<Genre>;
  guestSessionId: string;
};

export default class App extends Component {
  state: State = { ratedMovieCounter: 0, allGenres: [], guestSessionId: '' };

  serviceMovieDB = new ServiceMovieDB();

  componentDidMount() {
    this.getArrayGenres();
    this.createNewGuestSession();
    localStorage.removeItem('selectedMovies');
  }

  componentWillUnmount() {
    localStorage.removeItem('selectedMovies');
  }

  async getArrayGenres() {
    const responseGenres = await this.serviceMovieDB.getGenresData();
    this.setState({ allGenres: responseGenres.genres });
  }

  async createNewGuestSession() {
    const responseCreateGuestsSession = await this.serviceMovieDB.createGuestsSession();
    this.setState({ guestSessionId: responseCreateGuestsSession.guest_session_id });
  }

  onPersonRateCounter = () => {
    this.setState({ ratedMovieCounter: this.state.ratedMovieCounter + 1 });
  };

  render = () => {
    return (
      <div className={styles['app-wrapper']}>
        <div className={styles.app}>
          <GenresProvider value={this.state.allGenres}>
            <Tabs defaultActiveKey="Search" centered>
              <TabPane tab="Search" key="Search">
                <MovieList onPersonRateCounter={this.onPersonRateCounter} guestSessionId={this.state.guestSessionId} />
              </TabPane>
              <TabPane tab="Rated" key="Rated">
                <MovieListRated
                  ratedMovieCounter={this.state.ratedMovieCounter}
                  guestSessionId={this.state.guestSessionId}
                />
              </TabPane>
            </Tabs>
          </GenresProvider>
        </div>
      </div>
    );
  };
}
