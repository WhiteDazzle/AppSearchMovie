import React, { Component } from 'react';
import { Rate } from 'antd';

import './movie.css';
import Genre from '../../Data-types/genre';
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

export default class Movie extends Component<Props> {
  voteAverageColor = (voteAverage: number): {} => {
    if (voteAverage >= 7) return { border: '2px solid #66E900' };
    if (voteAverage >= 5) return { border: '2px solid #E9D100' };
    if (voteAverage >= 3) return { border: '2px solid #E97E00' };
    return { border: '2px solid #E90000' };
  };

  titleClassName = (title: string): string => {
    if (title.length >= 38) return 'movie__title movie__title--3-string';
    if (title.length >= 24) return 'movie__title movie__title--2-string';
    return 'movie__title';
  };

  descriptionSlice = (description: string): string => {
    if (description.length < 170) return description;
    const shortDescription = description.slice(0, 170);
    const lastSpace = shortDescription.lastIndexOf(' ');
    return shortDescription.slice(0, lastSpace) + '...';
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
    const release = new Date(releaseDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
          <p className="movie__release-date">{release !== 'Invalid Date' ? release : 'no release date'}</p>
          <div className="movie__genres"> {movieGenres} </div>
          <p className="movie__description">{this.descriptionSlice(description)}</p>
          <Rate className="rateStar" defaultValue={personRate} count={10} onChange={this.onPersonalRating} />
        </div>
      </div>
    );
  };
}
