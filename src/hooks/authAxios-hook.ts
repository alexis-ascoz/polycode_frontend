import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import useUser from './user-hook';

export default function useAuthAxios(url: string, method: string) {
  const userContext = useUser();
  const navigate = useNavigate();

  const axios = useAxios({
    url: config.API_URL + url,
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
    }
  }, { manual: true });

  const [{ error }] = axios;

  useEffect(() => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      userContext.setUser({
        isLoggedIn: false,
      });
      navigate('/');
    }
  }, [error, userContext, navigate]);

  return axios;
}
