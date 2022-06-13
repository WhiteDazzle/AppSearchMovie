export default class ServiceMovieDB {
  getResource(additionUrl: string, options = {}) {
    const baseUrl = 'https://api.themoviedb.org/3/';
    const url = baseUrl + additionUrl;
    return fetch(url, options);
  }

  async getMovieData(searchValue: string, pageNumber: number) {
    const MovieData = await this.getResource(
      `search/movie?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US&query=${searchValue}&page=${pageNumber}&include_adult=false`
    );
    if (!MovieData.ok) throw new Error('Проблемка');
    return MovieData.json();
  }

  async getGenresData() {
    const response = await this.getResource('genre/movie/list?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US');
    if (!response.ok) throw new Error('Проблемка');
    return response.json();
  }
}
