export default class ServiceMovieDB {
  apiKey = '080dad43fa18154700bb9b55ea7e3066';

  baseUrl = 'https://api.themoviedb.org/3/';

  getResource(additionUrl: string, options = {}) {
    const url = this.baseUrl + additionUrl;
    return fetch(url, options);
  }

  async getMovieData(searchValue: string, pageNumber: number) {
    const MovieData = await this.getResource(
      `search/movie?api_key=${this.apiKey}&language=en-US&query=${searchValue}&page=${pageNumber}&include_adult=false`
    );
    if (!MovieData.ok) throw new Error('Проблемка');
    return MovieData.json();
  }

  async getGenresData() {
    const response = await this.getResource(`genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    if (!response.ok) throw new Error('Проблемка');
    return response.json();
  }

  async createGuestsSession() {
    const response = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`);
    if (!response.ok) throw new Error('problem with creating a guest session');
    return response.json();
  }

  async postMovieRated(movieId: number, rate: number, sessionId: string) {
    const requestBody = JSON.stringify({ value: rate });
    const response = await this.getResource(
      `movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      }
    );
    if (!response.ok) throw new Error('poor movie score');
  }

  async getPersonalRated(sessionId: string) {
    const response = await this.getResource(
      `guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
    if (!response.ok) throw new Error('problem with creating a guest session');
    return response.json();
  }
}
