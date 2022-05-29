import React, { Component } from 'react';
import { Tabs } from 'antd';

import './App.css';
import MovieList from '../movies-list';
import MovieListRated from '../movie-list-rated';

const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

export default class App extends Component {
  render = () => {
    return (
      <div className="app">
        <Tabs defaultActiveKey="1" onChange={onChange} centered>
          <TabPane tab="Search" key="Search">
            <MovieList />
          </TabPane>
          <TabPane tab="Rated" key="Rated">
            <MovieListRated />
          </TabPane>
        </Tabs>
      </div>
    );
  };
}
