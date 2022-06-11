export default class Service {
  async getResource(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Проблемка');
    return response.json();
  }

  async getGenres() {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=080dad43fa18154700bb9b55ea7e3066&language=en-US'
    );
    if (!response.ok) throw new Error('Проблемка');
    return response.json();
  }
}
