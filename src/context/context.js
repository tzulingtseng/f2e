import { createContext, useContext } from 'react';

export const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}
