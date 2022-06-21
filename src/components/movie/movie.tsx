import React, { Component } from 'react';
import { Rate } from 'antd';

import MoviesGenre from '../movies-genre';
import listMessage from '../../message/list-message';

import movieUtils from './movie-utils';
import styles from './movie.module.scss';
interface Props {
  title: string;
  releaseDate: string;
  description: string;
  posterLink: string;
  voteAverage: number;
  id: number;
  setPersonalRating: (rate: number, id: number) => void;
  personRate: number;
  getMovieGenres: Array<number>;
}

export default class Movie extends Component<Props> {
  state = {
    ratingDisabled: false,
  };

  handlePersonalRating = (rate: number): void => {
    this.props.setPersonalRating(rate, this.props.id);
  };

  renderGenres = (genreId: number) => {
    return <MoviesGenre key={genreId} genreId={genreId}></MoviesGenre>;
  };

  render = () => {
    const { title, releaseDate, description, posterLink, voteAverage, personRate, getMovieGenres } = this.props;
    const genres = getMovieGenres.slice(0, 3).map(this.renderGenres);
    const basePosterLink = 'https://image.tmdb.org/t/p/original';
    const poster = posterLink ? (
      <img
        className={styles.poster}
        src={basePosterLink + posterLink}
        alt="We don't have a poster yet, but we'll fix that someday"
      />
    ) : (
      <img className={styles.poster} src="./altNoPoster.jpg" alt={listMessage.noPosterAlt} />
    );
    const release = new Date(releaseDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return (
      <div className={styles.movie}>
        {poster}
        <div className={styles.data}>
          <h4 className={movieUtils.titleClassName(title)}>{title}</h4>
          <div className={styles['overall-rating']} style={movieUtils.voteAverageColor(voteAverage)}>
            {voteAverage}
          </div>
          <p className={styles.release}>{release !== 'Invalid Date' ? release : 'no release date'}</p>
          <div className={styles.genres}> {genres}</div>
          <p className={styles.description}>{movieUtils.descriptionSlice(description)}</p>
          <Rate
            className={styles['rate-star']}
            defaultValue={personRate}
            count={10}
            disabled={this.props.personRate !== 0}
            onChange={this.handlePersonalRating}
          />
        </div>
      </div>
    );
  };
}
