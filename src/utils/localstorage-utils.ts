export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving data to local storage: ", error);
  }
}

export function fetchFromLocalStorage<T>(key: string): T {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching data from local storage: ", error);
    return null;
  }
}
