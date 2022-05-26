export default class Service {
  async getResource(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Проблемка');
    return response.json();
  }
}
