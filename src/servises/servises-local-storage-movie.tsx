import MovieData from '../Data-types/movie-data';
export default class ServiceLocalStorageMovie {
  setLocalStorageMovie = (key: string, value: MovieData[] = []): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorageMovie = (key: string): MovieData[] => {
    const value: string = localStorage.getItem(key)!;
    return JSON.parse(value);
  };
}
