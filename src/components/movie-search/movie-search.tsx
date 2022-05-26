import React, { Component } from 'react';
import './movie-search.css';

interface Props {
  getSearchChange: (e: any) => void;
}

export default class SearchMovie extends Component<Props> {
  render() {
    return (
      <input
        className="searchMovie"
        name="searchMovie"
        type="text"
        onChange={(e) => this.props.getSearchChange(e)}
        placeholder="Type to search..."
      />
    );
  }
}
