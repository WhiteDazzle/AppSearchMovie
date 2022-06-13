export default class ServiceLocalStorageMovie {
  setLocalStorageMovie = (key: string, value: object[] = []): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorageMovie = (key: string): object[] => {
    const value: string = localStorage.getItem(key)!;
    return JSON.parse(value);
  };
}
