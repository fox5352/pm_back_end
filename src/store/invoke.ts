import { invoke } from '@tauri-apps/api/tauri';

export interface Package<T> {
  data: T;
  message: string;
  error: boolean;
}

export const get = async <T>(
  funcName: string,
  data?: any
): Promise<Package<T>> => (data ? invoke(funcName, data) : invoke(funcName));
