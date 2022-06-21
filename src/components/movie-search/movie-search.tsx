import React, { Component } from 'react';

import styles from './movie-search.module.scss';

interface Props {
  handleSearchChange: (value: string) => void;
}

export default class SearchMovie extends Component<Props> {
  render() {
    return (
      <input
        className={styles.searchMovie}
        name="searchMovie"
        type="text"
        onChange={(e) => this.props.handleSearchChange(e.target.value)}
        placeholder="Type to search..."
      />
    );
  }
}
