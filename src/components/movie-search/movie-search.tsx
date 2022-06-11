import React, { Component } from 'react';
import './movie-search.css';

interface Props {
  getSearchChange: (value: string) => void;
}

export default class SearchMovie extends Component<Props> {
  render() {
    return (
      <input
        className="searchMovie"
        name="searchMovie"
        type="text"
        onChange={(e) => this.props.getSearchChange(e.target.value)}
        placeholder="Type to search..."
      />
    );
  }
}
