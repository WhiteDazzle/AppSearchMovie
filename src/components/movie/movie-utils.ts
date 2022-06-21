import styles from './movie.module.scss';

const movieUtils = {
  voteAverageColor: (voteAverage: number): {} => {
    if (voteAverage >= 7) return { border: '2px solid #66E900' };
    if (voteAverage >= 5) return { border: '2px solid #E9D100' };
    if (voteAverage >= 3) return { border: '2px solid #E97E00' };
    return { border: '2px solid #E90000' };
  },

  titleClassName: (title: string): string => {
    if (title.length >= 38) return styles.title + ' ' + styles['title--3-string'];
    if (title.length >= 24) return styles.title + ' ' + styles['title--2-string'];
    return 'movie__title';
  },

  descriptionSlice: (description: string): string => {
    if (description.length < 170) return description;
    const shortDescription = description.slice(0, 170);
    const lastSpace = shortDescription.lastIndexOf(' ');
    return shortDescription.slice(0, lastSpace) + '...';
  },
};

export default movieUtils;
