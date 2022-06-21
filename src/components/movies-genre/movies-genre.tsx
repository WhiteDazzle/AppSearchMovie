import { Component } from 'react';

import { GenresConsumer } from '../moviedb-service-context/moviedb-service-context';
import Genre from '../../Data-types/genre';

import styles from './movies-genre.module.scss';
interface Props {
  genreId: number;
}

export default class MoviesGenre extends Component<Props> {
  getMovieGenres = (genreId: Number, genres: Genre[]): string => {
    const genresIndex = genres.findIndex((genre: Genre) => {
      return genre.id === genreId;
    });
    return genres[genresIndex].name;
  };

  render = () => {
    return (
      <GenresConsumer>
        {(allGenres: Array<Genre>) => {
          const genres = this.getMovieGenres(this.props.genreId, allGenres);
          return <span className={styles['movie-genre']}>{genres}</span>;
        }}
      </GenresConsumer>
    );
  };
}
