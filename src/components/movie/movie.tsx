import { Card } from 'antd';
import React, { Component } from 'react';

import './movie.css';

interface Props {
  title: string;
  releaseDate: string;
  description: string;
  posterLink: string;
}

export default class Movie extends Component<Props> {
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
        <Card className="movie__data">
          <h4>{this.props.title}</h4>
          <p className="movie__release-date">{this.props.releaseDate}</p>
          <p className="movie__genres"> Card content </p>
          <p className="movie__description">{this.props.description}</p>
        </Card>
      </div>
    );
  };
}
