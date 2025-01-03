import { createStore as cs } from 'idb-keyval';

export const createStore = (dbName: string) => (storeName: string) => {
  const name = `${dbName}-${storeName}`;
  return cs(name, name);
};

export const baseStore = createStore('sma_app');
