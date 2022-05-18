import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import config from '../config';
import useUser from './user-hook';

export default function useAuthAxios(url: string, method: string) {
  const userContext = useUser();

  const axios = useAxios({
    url: config.API_URL + url,
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
    }
  }, { manual: true });

  const [{ error }] = axios;

  useEffect(() => {
    if (error) {
      console.log(error);
      // userContext.setUser(null);
    }
  }, [error, userContext]);

  return axios;
}
