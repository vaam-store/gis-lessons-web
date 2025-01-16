import { baseStore } from '@mod/storage';
import { clear, del, get, keys, set } from 'idb-keyval';
import { AsyncStorage } from 'oidc-client-ts';

export const authStore = baseStore('auth');

export class AsyncStorageImpl implements AsyncStorage {
  get length(): Promise<number> {
    return keys(authStore).then((keys) => keys.length);
  }

  public async clear(): Promise<void> {
    await clear(authStore);
  }

  public async getItem(key: string): Promise<string | null> {
    return (await get(key, authStore)) as string | null;
  }

  public async key(index: number): Promise<string | null> {
    const allKeys = await keys(authStore);
    return (allKeys[index] || null) as string | null;
  }

  public async removeItem(key: string): Promise<void> {
    await del(key, authStore);
  }

  public async setItem(key: string, value: string): Promise<void> {
    await set(key, value, authStore);
  }
}
