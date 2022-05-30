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
  onPersonRate: (rate: number, id: number) => void;
  personRate: number;
}

export default class Movie extends Component<Props> {
  ratingColor = (): {} => {
    if (this.props.voteAverage >= 7) return { border: '2px solid #66E900' };
    if (this.props.voteAverage >= 5) return { border: '2px solid #E9D100' };
    if (this.props.voteAverage >= 3) return { border: '2px solid #E97E00' };
    return { border: '2px solid #E90000' };
  };

  onPersonRate = (rate: number): void => {
    this.props.onPersonRate(rate, this.props.id);
  };

  render = () => {
    const poster = this.props.posterLink ? (
      <img
        className="movie__poster"
        src={`https://image.tmdb.org/t/p/original${this.props.posterLink}`}
        alt="We don't have a poster yet, but we'll fix that someday"
      />
    ) : (
      <img src="./altNoPoster.jpg" alt="We don't have a poster yet, but we'll fix that someday" />
    );
    return (
      <div className="movie">
        {poster}
        <div className="movie__data">
          <h4 className="movie__title">{this.props.title}</h4>
          <div className="movie__overall-rating" style={this.ratingColor()}>
            {this.props.voteAverage}
          </div>
          <p className="movie__release-date">{this.props.releaseDate}</p>
          <p className="movie__genres"> Card content </p>
          <p className="movie__description">{this.props.description}</p>
          <Rate className="rateStar" defaultValue={this.props.personRate} count={10} onChange={this.onPersonRate} />
        </div>
      </div>
    );
  };
}
