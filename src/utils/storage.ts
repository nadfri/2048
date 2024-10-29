import { StorageType } from '@/types/types';

export const saveInStorage = (data: StorageType) => {
  localStorage.setItem('2048', JSON.stringify(data));
};

export const getFromStorage = (): StorageType => {
  const data = localStorage.getItem('2048');
  return data ? (JSON.parse(data) as StorageType) : null;
};
