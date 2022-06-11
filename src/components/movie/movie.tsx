import React, { Component } from 'react';
import { Rate } from 'antd';

import './movie.css';

interface Props {
  title: string;
  releaseDate: string;
  description: string;
  posterLink: string;
  voteAverage: number;
  id: number;
  addPersonalRating: (rate: number, id: number) => void;
  personRate: number;
  getMovieGenres: Array<Genre>;
}

interface Genre {
  id: number;
  name: string;
}

export default class Movie extends Component<Props> {
  voteAverageColor = (voteAverage: number): {} => {
    if (voteAverage >= 7) return { border: '2px solid #66E900' };
    if (voteAverage >= 5) return { border: '2px solid #E9D100' };
    if (voteAverage >= 3) return { border: '2px solid #E97E00' };
    return { border: '2px solid #E90000' };
  };

  titleClassName = (title: string): string => {
    if (title.length >= 35) return 'movie__title movie__title--3-string';
    if (title.length >= 22) return 'movie__title movie__title--2-string';
    return 'movie__title';
  };

  onPersonalRating = (rate: number): void => {
    this.props.addPersonalRating(rate, this.props.id);
  };

  render = () => {
    const { title, releaseDate, description, posterLink, voteAverage, personRate, getMovieGenres } = this.props;
    const poster = posterLink ? (
      <img
        className="movie__poster"
        src={`https://image.tmdb.org/t/p/original${posterLink}`}
        alt="We don't have a poster yet, but we'll fix that someday"
      />
    ) : (
      <img
        className="movie__poster"
        src="./altNoPoster.jpg"
        alt="We don't have a poster yet, but we'll fix that someday"
      />
    );

    const movieGenres = getMovieGenres.map((genre: Genre) => (
      <span key={genre.name} className="movie__genre">
        {' '}
        {genre.name}{' '}
      </span>
    ));
    return (
      <div className="movie">
        {poster}
        <div className="movie__data">
          <h4 className={this.titleClassName(title)}>{title}</h4>
          <div className="movie__overall-rating" style={this.voteAverageColor(voteAverage)}>
            {voteAverage}
          </div>
          <p className="movie__release-date">{releaseDate}</p>
          <div className="movie__genres"> {movieGenres} </div>
          <p className="movie__description">{description}</p>
          <Rate className="rateStar" defaultValue={personRate} count={10} onChange={this.onPersonalRating} />
        </div>
      </div>
    );
  };
}
